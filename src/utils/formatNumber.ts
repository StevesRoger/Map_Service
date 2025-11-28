/**
 * Format number with locale support (English and Khmer)
 */
export function formatNumber(
  value: number | undefined | null,
  options?: {
    locale?: 'en' | 'km';
    unitSpace?: boolean;
  }
): string {
  const { locale = 'en', unitSpace = false } = options || {};
  
  // Handle undefined/null values
  if (value === undefined || value === null || isNaN(value)) {
    return locale === 'km' ? '០' : '0';
  }
  
  // For Khmer locale, use Khmer numerals
  if (locale === 'km') {
    const khmerNumerals = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    const numStr = value.toLocaleString('en-US');
    return numStr.split('').map(char => {
      if (char >= '0' && char <= '9') {
        return khmerNumerals[parseInt(char)];
      }
      return char;
    }).join('');
  }
  
  // For English locale, use standard formatting
  return value.toLocaleString('en-US');
}

/**
 * Format currency with locale support (English and Khmer)
 */
export function formatCurrency(
  value: number | undefined | null,
  options?: {
    locale?: 'en' | 'km';
    decimals?: number;
    symbol?: string;
  }
): string {
  const { locale = 'en', decimals = 2, symbol = '$' } = options || {};
  
  // Handle undefined/null values
  if (value === undefined || value === null || isNaN(value)) {
    const zeroValue = '0.' + '0'.repeat(decimals);
    if (locale === 'km') {
      const khmerNumerals = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
      const khmerZero = zeroValue.split('').map(char => {
        if (char >= '0' && char <= '9') {
          return khmerNumerals[parseInt(char)];
        }
        return char;
      }).join('');
      return `${symbol}${khmerZero}`;
    }
    return `${symbol}${zeroValue}`;
  }
  
  const formattedValue = value.toFixed(decimals);
  
  // For Khmer locale, use Khmer numerals
  if (locale === 'km') {
    const khmerNumerals = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    const khmerValue = formattedValue.split('').map(char => {
      if (char >= '0' && char <= '9') {
        return khmerNumerals[parseInt(char)];
      }
      return char;
    }).join('');
    return `${symbol}${khmerValue}`;
  }
  
  // For English locale, use standard formatting with thousand separators
  const parts = formattedValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${symbol}${parts.join('.')}`;
}
