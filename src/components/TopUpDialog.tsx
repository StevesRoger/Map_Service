import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CheckCircle2, X, Download } from 'lucide-react';
import { toast } from 'sonner';
import { apiServiceManager } from '../services/apiService';
import { downloadInvoice, generateInvoiceNumber } from '../services/invoiceService';
import type { Transaction } from '../types/api';
import { useLanguage } from './LanguageContext';
import html2canvas from 'html2canvas';
import { TopUpAmountStep } from './TopUpAmountStep';
import { TopUpScanningStep } from './TopUpScanningStep';

interface TopUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userBalance?: number;
  userId?: string;
  userName?: string;
  userEmail?: string;
  onBalanceUpdate?: (newBalance: number) => void;
  onTransactionCreated?: (transaction: Transaction) => void;
  onTransactionUpdate?: (transaction: Transaction) => void;
  onTopUpSuccess?: (amount: number, newBalance: number) => void;
}

type TopUpStep = 'amount' | 'scanning' | 'success';

export function TopUpDialog({ open, onOpenChange, userBalance, userId, userName, userEmail, onBalanceUpdate, onTransactionCreated, onTransactionUpdate, onTopUpSuccess }: TopUpDialogProps) {
  const { t, language } = useLanguage();
  const fontClass = language === 'km' ? 'font-kh' : 'font-en';
  
  const [topUpStep, setTopUpStep] = useState<TopUpStep>('amount');
  const [topUpAmount, setTopUpAmount] = useState('5');
  const [countdown, setCountdown] = useState(15);
  const [completedTransaction, setCompletedTransaction] = useState<Transaction | null>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const quickTopUpAmounts = [5, 10, 50, 100, 500];

  // Reset to first step when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTimeout(() => {
        setTopUpStep('amount');
        setTopUpAmount('5');
        setCountdown(15);
      }, 300);
    }
    onOpenChange(newOpen);
  };

  // Countdown timer for scanning step
  useEffect(() => {
    if (topUpStep === 'scanning' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            handlePaymentComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [topUpStep, countdown]);

  const handleConfirmTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount) || amount < 5) {
      toast.error(t.topUp.minTopUpError);
      return;
    }
    if (amount > 10000) {
      toast.error(t.topUp.maxTopUpError);
      return;
    }

    // Create pending transaction when generating QR code
    if (onTransactionCreated && userId) {
      const currentBalance = userBalance || 0;
      const pendingTransaction: Transaction = {
        id: `txn_${Date.now()}`,
        userId: userId,
        type: 'top_up',
        amount: amount,
        balanceBefore: currentBalance,
        balanceAfter: currentBalance + amount,
        description: 'Wallet Top-up via KHQR',
        timestamp: new Date().toISOString(),
        status: 'pending',
        paymentMethod: 'KHQR'
      };
      
      onTransactionCreated(pendingTransaction);
    }

    setTopUpStep('scanning');
    setCountdown(15);
  };

  const handlePaymentComplete = async () => {
    const amount = parseFloat(topUpAmount);
    try {
      // If we have callback handlers (sidebar flow), create and complete transaction
      if (onBalanceUpdate && onTransactionUpdate && userId) {
        const currentBalance = userBalance || 0;
        const newBalance = currentBalance + amount;
        
        // Create completed transaction
        const transaction: Transaction = {
          id: `txn_${Date.now()}`,
          userId: userId,
          type: 'top_up',
          amount: amount,
          balanceBefore: currentBalance,
          balanceAfter: newBalance,
          description: 'Wallet Top-up via KHQR',
          timestamp: new Date().toISOString(),
          status: 'completed',
          paymentMethod: 'KHQR'
        };
        
        setCompletedTransaction(transaction);
        onBalanceUpdate(newBalance);
        onTransactionUpdate(transaction);
        setTopUpStep('success');
        if (onTopUpSuccess) {
          onTopUpSuccess(amount, newBalance);
        }
      } else {
        // Fallback: Use API service (standalone dialog without callbacks)
        await apiServiceManager.createTopUpTransaction(userId, amount, 'KHQR');
        
        const txns = await apiServiceManager.getTransactions(userId);
        const latestTransaction = txns[0];
        setCompletedTransaction(latestTransaction);
        
        setTopUpStep('success');
        if (onBalanceUpdate && userBalance !== undefined) {
          onBalanceUpdate(userBalance + amount);
        }
        if (onTopUpSuccess && userBalance !== undefined) {
          onTopUpSuccess(amount, userBalance + amount);
        }
      }
    } catch (error) {
      toast.error(t.topUp.paymentProcessError);
      setTopUpStep('amount');
    }
  };

  const handleSuccessClose = () => {
    handleOpenChange(false);
    toast.success(t.topUp.topUpSuccessToast.replace('${amount}', `$${parseFloat(topUpAmount).toFixed(2)}`));
  };

  const handleDownloadInvoice = () => {
    if (!completedTransaction) {
      toast.error(t.topUp.noTransactionData);
      return;
    }

    // Placeholder logo image (replace with actual logo URL)
    const logoImage = "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=100&h=100&fit=crop";

    const invoiceData = {
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      transaction: completedTransaction,
      customerName: userName,
      customerEmail: userEmail,
      logoImage
    };

    downloadInvoice(invoiceData);
    toast.success(t.topUp.invoiceDownloaded);
    handleSuccessClose();
  };

  const handleDownloadQR = async () => {
    if (!qrCodeRef.current) {
      toast.error('QR code not found');
      return;
    }

    try {
      const canvas = await html2canvas(qrCodeRef.current, {
        backgroundColor: '#000000',
        scale: 2,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `KHQR-${parseFloat(topUpAmount).toFixed(2)}-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast.success('QR code downloaded successfully');
        }
      });
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast.error('Failed to download QR code');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepContent = () => {
    switch (topUpStep) {
      case 'amount':
        return { title: 'Top Up Balance', description: 'Add funds to your wallet' };
      case 'scanning':
        return { title: 'Scan QR Code', description: 'Scan the QR code to complete payment' };
      case 'success':
        return { title: 'Payment Completed', description: 'Your payment was successful' };
      default:
        return { title: 'Top Up', description: 'Manage your balance' };
    }
  };

  const { title, description } = getStepContent();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-[402px] p-0 gap-0">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>

        {/* Step 1: Amount Selection */}
        {topUpStep === 'amount' && (
          <TopUpAmountStep
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
            quickTopUpAmounts={quickTopUpAmounts}
            onConfirm={handleConfirmTopUp}
            onCancel={() => handleOpenChange(false)}
            t={t}
            fontClass={fontClass}
          />
        )}

        {/* Step 2: Scanning QR Code */}
        {topUpStep === 'scanning' && (
          <TopUpScanningStep
            topUpAmount={topUpAmount}
            countdown={countdown}
            qrCodeRef={qrCodeRef}
            onDownloadQR={handleDownloadQR}
            onPaymentComplete={handlePaymentComplete}
            t={t}
            fontClass={fontClass}
            variant="sidebar"
          />
        )}

        {/* Step 3: Success */}
        {topUpStep === 'success' && (
          <div className="bg-black p-12 relative min-h-[400px] flex flex-col items-center justify-center">
            {/* Success Content */}
            <div className="flex flex-col items-center gap-6">
              {/* Success Icon */}
              <div className="w-[90px] h-[90px] rounded-full bg-[#1b5ba5] flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>

              {/* Heading */}
              <div className="text-center space-y-3">
                <h2 className={`text-white text-3xl ${fontClass}`}>{t.topUp.paymentCompleted}</h2>
                <p className={`text-white text-sm max-w-[370px] ${fontClass}`}>
                  {t.topUp.paymentSuccessMessage}
                </p>
              </div>

              {/* Get Invoice Button */}
              <button
                onClick={handleDownloadInvoice}
                className={`h-[30px] px-4 bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 rounded-md text-white text-sm transition-colors flex items-center gap-2 shadow-[0px_2px_6px_0px_rgba(115,103,240,0.3)] ${fontClass}`}
              >
                <span>{t.topUp.getInvoice}</span>
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}