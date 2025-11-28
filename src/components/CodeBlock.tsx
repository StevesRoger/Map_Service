import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for browsers/contexts where Clipboard API is blocked
        copyTextFallback(code);
      }
    } catch (err) {
      // If Clipboard API fails, use fallback method
      console.log('Clipboard API failed, using fallback method');
      copyTextFallback(code);
    }
  };

  const copyTextFallback = (text: string) => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.focus();
    textarea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error('Fallback copy failed');
      }
    } catch (err) {
      console.error('Failed to copy text:', err);
    } finally {
      // Clean up
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="relative group">
      <pre 
        onClick={handleCopy}
        className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
      >
        <code>{code}</code>
      </pre>
      {copied && (
        <div className="absolute top-2 right-2 p-2 rounded-md bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 flex items-center gap-1.5 pointer-events-none">
          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-xs text-green-600 dark:text-green-400 font-en">Copied!</span>
        </div>
      )}
    </div>
  );
}