import { memo } from 'react';

interface LoadingFallbackProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const LoadingFallback = memo(function LoadingFallback({ 
  text = 'Loading...', 
  size = 'md',
  fullScreen = false 
}: LoadingFallbackProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-b-2',
    lg: 'h-16 w-16 border-b-3'
  };

  const containerClasses = fullScreen 
    ? 'h-screen flex items-center justify-center bg-background' 
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-blue-500 mx-auto mb-4`}></div>
        <p className="text-zinc-600 dark:text-zinc-400">{text}</p>
      </div>
    </div>
  );
});

// Minimal loader for inline use
export const InlineLoader = memo(function InlineLoader() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
});
