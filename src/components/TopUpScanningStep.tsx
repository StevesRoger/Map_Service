import { Download, RefreshCcw, X } from "lucide-react";
import { RefObject, useState, useEffect } from "react";
import svgPaths from "../imports/svg-2l6tcmkq9f";
import { apiServiceManager } from '../services/apiService';
import { toast } from 'sonner';

// Placeholder QR code image (replace with actual QR code)
const qrCodeImage = "https://images.unsplash.com/photo-1617575523629-b0c2d050c8bb?w=400&h=400&fit=crop";

interface TopUpScanningStepProps {
  topUpAmount: string;
  countdown: number;
  qrCodeRef: RefObject<HTMLDivElement>;
  onDownloadQR: () => void;
  onPaymentComplete?: () => void;
  onPaymentFailed?: () => void;
  transactionId?: string;
  hasDownloadedQR?: boolean;
  t: any;
  fontClass: string;
  variant?: "wallet" | "sidebar";
  logoImage?: string;
}

export function TopUpScanningStep({
  topUpAmount,
  countdown,
  qrCodeRef,
  onDownloadQR,
  onPaymentComplete,
  onPaymentFailed,
  transactionId,
  hasDownloadedQR = false,
  t,
  fontClass,
  variant = "sidebar",
  logoImage,
}: TopUpScanningStepProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);
  const [autoCheckInterval, setAutoCheckInterval] = useState<NodeJS.Timeout | null>(null);

  // Auto-check payment every 5 seconds
  useEffect(() => {
    if (transactionId && !showFailureDialog) {
      const interval = setInterval(() => {
        checkPayment();
      }, 5000); // Check every 5 seconds
      
      setAutoCheckInterval(interval);
      
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [transactionId, showFailureDialog]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (autoCheckInterval) {
        clearInterval(autoCheckInterval);
      }
    };
  }, [autoCheckInterval]);

  const checkPayment = async () => {
    if (!transactionId || isChecking) return;
    
    setIsChecking(true);
    
    try {
      const result = await apiServiceManager.checkPaymentStatus(transactionId, hasDownloadedQR);
      
      if (result.isPaid && result.status === 'completed') {
        // Payment successful
        if (autoCheckInterval) {
          clearInterval(autoCheckInterval);
          setAutoCheckInterval(null);
        }
        
        if (onPaymentComplete) {
          onPaymentComplete();
        }
      } else {
        // Payment not yet received - show failure dialog
        if (autoCheckInterval) {
          clearInterval(autoCheckInterval);
          setAutoCheckInterval(null);
        }
        
        setShowFailureDialog(true);
      }
    } catch (error) {
      console.error('Payment check failed:', error);
      toast.error('Failed to check payment status');
    } finally {
      setIsChecking(false);
    }
  };

  const handleTryAgain = () => {
    setShowFailureDialog(false);
    
    // Restart auto-checking
    if (transactionId) {
      const interval = setInterval(() => {
        checkPayment();
      }, 5000);
      setAutoCheckInterval(interval);
    }
  };

  const handleCancelPayment = () => {
    if (autoCheckInterval) {
      clearInterval(autoCheckInterval);
      setAutoCheckInterval(null);
    }
    
    if (onPaymentFailed) {
      onPaymentFailed();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = countdown / 900; // 900 seconds = 15 minutes

  return (
    <>
      <div className="bg-black rounded-xl flex flex-col min-h-[600px]">
        {/* Top Header with Gradient */}
        <div
          className={`bg-gradient-to-b ${
            variant === "wallet"
              ? "from-[#51a2ff] to-[#103a6b]"
              : "from-[#1B5BA5] to-[#0f3d6e]"
          } relative rounded-t-xl`}
        >
          <div
            className={`flex items-center justify-between py-4 px-[40px]`}
          >
            {/* Left Side - KHQR Badge */}
            <div className="flex flex-col gap-1">
              <p
                className={`text-white/90 text-[10px] tracking-tight ${fontClass}`}
              >
                {t.topUp.memberOf}
              </p>
              <div className="w-[51px] h-5 bg-[#E1232E] rounded flex items-center justify-center">
                <span className="text-white text-[11px] font-medium font-en">
                  KHQR
                </span>
              </div>
            </div>

            {/* Right: Time Remaining with Countdown Timer */}
            <div className="flex items-center gap-2">
              <span
                className={`text-white/80 text-sm ${fontClass}`}
              >
                {t.topUp.timeRemaining}
              </span>
              <div className="relative w-6 h-6">
                <svg
                  className="absolute inset-0 -rotate-90"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 10}`}
                    strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress)}`}
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
              <span className="text-white text-base font-medium font-en">
                {formatTime(countdown)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col items-center justify-center py-6 px-5 ${
            variant === "wallet" ? "gap-5" : "gap-6"
          }`}
        >
          {/* Title */}
          <h2
            className={`${
              variant === "wallet"
                ? "text-[#e8eaed]"
                : "text-white"
            } text-lg text-center leading-relaxed ${fontClass}`}
          >
            {t.topUp.scanQRTitle}
          </h2>

          {/* QR Code Card with Corner Brackets */}
          <div
            ref={qrCodeRef}
            data-qr-container
            className="relative"
          >
            {/* Corner Brackets - Top */}
            <svg
              className="absolute left-0 top-0 w-[232px] h-[23px]"
              viewBox="0 0 232 23"
              style={{ transform: "translate(-18px, -11px)" }}
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M4 19 L4 4 C4 2 5 1 7 1 L23 1"
                stroke="#E21A1A"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <path
                d="M228 19 L228 4 C228 2 227 1 225 1 L209 1"
                stroke="#E21A1A"
                strokeLinejoin="round"
                strokeWidth="4"
              />
            </svg>

            {/* Corner Brackets - Bottom */}
            <svg
              className="absolute left-0 bottom-0 w-[232px] h-[23px]"
              viewBox="0 0 232 23"
              style={{
                transform: "translate(-18px, 11px) scaleY(-1)",
              }}
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M4 19 L4 4 C4 2 5 1 7 1 L23 1"
                stroke="#E21A1A"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <path
                d="M228 19 L228 4 C228 2 227 1 225 1 L209 1"
                stroke="#E21A1A"
                strokeLinejoin="round"
                strokeWidth="4"
              />
            </svg>

            {/* White Card */}
            <div
              className="bg-white rounded-lg relative"
              style={{
                width: "196px",
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* KHQR Header */}
              <div className="bg-[#E21A1A] rounded-t-lg h-[54px] w-full flex items-center justify-center">
                <span className="text-white font-medium text-base font-en">
                  KHQR
                </span>
              </div>

              {/* Merchant Info */}
              <div className="px-[26px] pt-4 pb-3">
                <p className="text-black text-xs font-medium mb-1.5 font-en">
                  ROKTENH MAP
                </p>
                <div className="flex items-center gap-1">
                  <span
                    className="text-black text-lg font-en"
                    style={{ fontWeight: "bold" }}
                  >
                    $
                  </span>
                  <span className="text-black text-xl font-medium font-en">
                    {parseFloat(topUpAmount).toLocaleString(
                      "en-US",
                    )}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="px-4">
                <div
                  className="border-t border-dashed"
                  style={{
                    borderWidth: "0.5px",
                    borderColor: "rgba(0, 0, 0, 0.5)",
                  }}
                />
              </div>

              {/* QR Code */}
              <div className="px-4 py-4 flex items-center justify-center">
                <div className="w-[144px] h-[144px] bg-white flex items-center justify-center">
                  {/* KHQR QR Code - Fixed PNG */}
                  <img
                    src={qrCodeImage}
                    alt="KHQR QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div
            className={`text-center ${variant === "wallet" ? "max-w-[316px]" : "max-w-[320px]"}`}
          >
            <p
              className={`text-[#e8eaed] text-sm leading-relaxed mb-2 ${fontClass}`}
            >
              {t.topUp.downloadOrScreenshot}
            </p>
            <p
              className={`text-white ${
                variant === "wallet"
                  ? "text-[10px] leading-5"
                  : "text-xs leading-relaxed"
              } ${fontClass}`}
            >
              {t.topUp.khqrNote}
            </p>
          </div>

          {/* Auto-checking indicator */}
          {transactionId && !showFailureDialog && (
            <div className="flex items-center gap-2 text-white/70 text-xs">
              <RefreshCcw className={`w-3 h-3 ${isChecking ? 'animate-spin' : ''}`} />
              <span className={fontClass}>
                {isChecking ? t.topUp.checkingPayment || 'Checking payment status...' : t.topUp.autoChecking || 'Auto-checking every 5 seconds'}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 w-full max-w-[320px]">
            <button
              onClick={onDownloadQR}
              className={`flex-1 h-10 px-4 bg-white hover:bg-gray-100 rounded-lg text-black text-sm transition-colors flex items-center justify-center gap-2 ${fontClass}`}
            >
              <span>{t.topUp.downloadQR}</span>
              <Download className="w-4 h-4" />
            </button>
            {onPaymentComplete && transactionId && (
              <button
                onClick={checkPayment}
                disabled={isChecking}
                className={`flex-1 h-10 px-4 bg-[#00C950] hover:bg-[#00C950]/90 rounded-lg text-white text-sm transition-colors flex items-center justify-center gap-2 ${fontClass} ${isChecking ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isChecking ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                    <span className="text-[12px]">{t.topUp.checking || 'Checking...'}</span>
                  </>
                ) : (
                  <span className="text-[12px]">✓ {t.topUp.checkPayment || 'Check Payment'}</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment Failure Dialog */}
      {showFailureDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl max-w-md w-full p-6 space-y-6 animate-in fade-in zoom-in duration-200">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                <X className="w-8 h-8 text-red-500" />
              </div>
            </div>

            {/* Title & Message */}
            <div className="text-center space-y-2">
              <h3 className={`text-white text-xl ${fontClass}`}>
                {t.topUp.paymentNotReceived || 'Payment Not Received'}
              </h3>
              <p className={`text-zinc-400 text-sm ${fontClass}`}>
                {t.topUp.paymentNotReceivedDesc || 'We haven\'t received your payment yet. Please make sure you\'ve completed the payment through your banking app, or try checking again.'}
              </p>
            </div>

            {/* Amount Info */}
            <div className="bg-zinc-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className={`text-zinc-400 text-sm ${fontClass}`}>
                  {t.topUp.amount || 'Amount'}
                </span>
                <span className="text-white text-lg font-en">
                  ${parseFloat(topUpAmount).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowFailureDialog(false)}
                className={`w-full h-11 bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 rounded-lg text-white transition-colors flex items-center justify-center gap-2 ${fontClass}`}
              >
                <span>{t.common.ok || 'OK'}</span>
              </button>
            </div>

            {/* Help Text */}
            <p className={`text-center text-zinc-500 text-xs ${fontClass}`}>
              {t.topUp.needHelp || 'Need help? Contact our support team'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}