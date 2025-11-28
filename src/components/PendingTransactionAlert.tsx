import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from './ui/alert-dialog';
import { Button } from './ui/button';
import { Clock, XCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import type { Transaction } from '../types/api';

interface PendingTransactionAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendingTransaction: Transaction | null;
  onResume: () => void;
  onCancel: () => void;
}

export function PendingTransactionAlert({ 
  open, 
  onOpenChange, 
  pendingTransaction,
  onResume,
  onCancel
}: PendingTransactionAlertProps) {
  const { t, language } = useLanguage();
  const fontClass = language === 'km' ? 'font-kh' : 'font-en';

  if (!pendingTransaction) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-zinc-900 border-zinc-800 max-w-[420px]">
        <AlertDialogTitle className="sr-only">Pending Transaction</AlertDialogTitle>
        <AlertDialogDescription className="sr-only">
          You have a pending transaction that hasn't been completed
        </AlertDialogDescription>

        <div className="flex flex-col items-center gap-6 py-4">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Clock className="w-8 h-8 text-amber-500" />
          </div>

          {/* Content */}
          <div className="text-center space-y-3">
            <h3 className={`text-zinc-100 text-xl ${fontClass}`}>
              {t.pendingTransaction?.title || 'Pending Transaction'}
            </h3>
            <p className={`text-zinc-400 text-sm max-w-[340px] ${fontClass}`}>
              {t.pendingTransaction?.message || 'You have an incomplete top-up transaction. Would you like to continue where you left off?'}
            </p>
          </div>

          {/* Transaction Details */}
          <div className="w-full p-4 rounded-lg bg-zinc-800 border border-zinc-700 space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-zinc-400 text-sm ${fontClass}`}>
                {t.pendingTransaction?.amount || 'Amount'}
              </span>
              <span className="text-zinc-100 font-en">${pendingTransaction.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-zinc-400 text-sm ${fontClass}`}>
                {t.pendingTransaction?.status || 'Status'}
              </span>
              <span className="text-amber-400 text-sm font-en">Pending</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              onClick={onCancel}
              className={`flex-1 border-zinc-700 hover:bg-zinc-800 text-zinc-300 ${fontClass}`}
            >
              <XCircle className="w-4 h-4 mr-2" />
              {t.pendingTransaction?.cancelAndNew || 'Cancel & Start New'}
            </Button>
            <Button
              onClick={onResume}
              className={`flex-1 bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white ${fontClass}`}
            >
              <Clock className="w-4 h-4 mr-2" />
              {t.pendingTransaction?.resume || 'Pay Now'}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}