import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, AlertCircle } from 'lucide-react';
import { useMemo } from 'react';

interface TopUpAmountStepProps {
  topUpAmount: string;
  setTopUpAmount: (amount: string) => void;
  quickTopUpAmounts: number[];
  onConfirm: () => void;
  onCancel: () => void;
  fontClass: string;
  t: any;
}

const MIN_AMOUNT = 5;
const MAX_AMOUNT = 10000;

export function TopUpAmountStep({
  topUpAmount,
  setTopUpAmount,
  quickTopUpAmounts,
  onConfirm,
  onCancel,
  fontClass,
  t
}: TopUpAmountStepProps) {
  // Validation logic
  const validation = useMemo(() => {
    const amount = parseFloat(topUpAmount);
    
    if (!topUpAmount || topUpAmount.trim() === '') {
      return { isValid: false, error: '' }; // Empty state, no error shown
    }
    
    if (isNaN(amount)) {
      return { isValid: false, error: t.topUp?.validation?.invalidNumber || 'Please enter a valid number' };
    }
    
    if (amount <= 0) {
      return { isValid: false, error: t.topUp?.validation?.positiveNumber || 'Amount must be greater than zero' };
    }
    
    if (amount < MIN_AMOUNT) {
      return { isValid: false, error: t.topUp?.validation?.minAmount || `Minimum top-up amount is $${MIN_AMOUNT}` };
    }
    
    if (amount > MAX_AMOUNT) {
      return { isValid: false, error: t.topUp?.validation?.maxAmount || `Maximum top-up amount is $${MAX_AMOUNT.toLocaleString()}` };
    }
    
    // Check for too many decimal places (max 2)
    const decimalPart = topUpAmount.split('.')[1];
    if (decimalPart && decimalPart.length > 2) {
      return { isValid: false, error: t.topUp?.validation?.maxDecimals || 'Maximum 2 decimal places allowed' };
    }
    
    return { isValid: true, error: '' };
  }, [topUpAmount, t]);

  // Handle input change with validation
  const handleAmountChange = (value: string) => {
    // Allow empty string
    if (value === '') {
      setTopUpAmount('');
      return;
    }
    
    // Allow only numbers and one decimal point
    if (!/^\d*\.?\d*$/.test(value)) {
      return; // Reject invalid characters
    }
    
    // Prevent multiple decimal points
    if ((value.match(/\./g) || []).length > 1) {
      return;
    }
    
    setTopUpAmount(value);
  };

  const showError = topUpAmount && topUpAmount.trim() !== '' && !validation.isValid;

  return (
    <div className="p-5 relative">
      {/* Header */}
      <div className="mb-6">
        <h2 className={`text-zinc-200 text-lg ${fontClass}`}>{t.topUp.title}</h2>
        <p className={`text-zinc-400 text-sm mt-2 ${fontClass}`}>
          {t.topUp.subtitle}
        </p>
      </div>

      {/* Amount Input */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className={`text-zinc-100 text-sm ${fontClass}`}>{t.topUp.amountLabel}</Label>
          <div className="relative">
            <Input
              type="text"
              inputMode="decimal"
              value={topUpAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder={t.topUp.amountPlaceholder}
              className={`bg-zinc-900 border-zinc-800 text-zinc-100 h-9 font-en pr-10 ${
                showError ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              aria-invalid={showError}
              aria-describedby={showError ? 'amount-error' : undefined}
            />
            {topUpAmount && parseFloat(topUpAmount) > 0 && (
              <button
                onClick={() => setTopUpAmount('5')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-100 transition-colors"
                type="button"
                aria-label="Reset amount"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {/* Error Message */}
          {showError && (
            <div id="amount-error" className="flex items-start gap-1.5 text-red-400 text-xs mt-1.5" role="alert">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span className={fontClass}>{validation.error}</span>
            </div>
          )}
          {/* Helper Text */}
          {!showError && (
            <p className={`text-xs text-zinc-500 mt-1.5 ${fontClass}`}>
              {t.topUp?.validation?.helperText || `Enter amount between $${MIN_AMOUNT} and $${MAX_AMOUNT.toLocaleString()}`}
            </p>
          )}
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex gap-2">
          {quickTopUpAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setTopUpAmount((prev) => (parseFloat(prev || '0') + amount).toString())}
              className="flex-1 h-8 px-3 bg-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.35)] rounded-lg text-zinc-200 text-sm text-center transition-colors font-en"
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Payment Method Info */}
        <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[51px] h-5 bg-[#E1232E] rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-medium font-en">KHQR</span>
            </div>
            <span className={`text-zinc-300 text-sm ${fontClass}`}>{t.topUp.paymentViaKHQR}</span>
          </div>
          <p className={`text-xs text-zinc-500 ${fontClass}`}>
            {t.topUp.qrCodeInstruction}
          </p>
        </div>

        {/* Summary */}
        {topUpAmount && parseFloat(topUpAmount) >= 5 && (
          <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700">
            <div className="flex justify-between text-sm mb-2">
              <span className={`text-zinc-400 ${fontClass}`}>{t.topUp.summaryAmount}</span>
              <span className="text-zinc-100 font-en">${parseFloat(topUpAmount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className={`text-zinc-400 ${fontClass}`}>{t.topUp.processingFee}</span>
              <span className="text-zinc-100 font-en">$0.00</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-zinc-700">
              <span className={`text-zinc-100 ${fontClass}`}>{t.topUp.total}</span>
              <span className="text-zinc-100 font-medium font-en">${parseFloat(topUpAmount).toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <Button
          variant="outline"
          onClick={onCancel}
          className={`flex-1 border-zinc-700 hover:bg-zinc-800 ${fontClass}`}
        >
          {t.topUp.cancel}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={!topUpAmount || parseFloat(topUpAmount) < 5 || parseFloat(topUpAmount) > 10000}
          className={`flex-1 bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white ${fontClass}`}
        >
          {t.topUp.confirmTopUp}
        </Button>
      </div>
    </div>
  );
}