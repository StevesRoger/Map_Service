/**
 * Performance Monitoring Utilities
 * Provides tools for measuring and tracking application performance
 */

// Mark performance metrics
export const performanceMark = (name: string): void => {
  if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
    window.performance.mark(name);
  }
};

// Measure performance between two marks
export const performanceMeasure = (
  name: string,
  startMark: string,
  endMark: string
): number | null => {
  if (typeof window !== 'undefined' && window.performance && window.performance.measure) {
    try {
      window.performance.measure(name, startMark, endMark);
      const measure = window.performance.getEntriesByName(name)[0] as PerformanceEntry;
      return measure?.duration || null;
    } catch (error) {
      console.warn('Performance measurement failed:', error);
      return null;
    }
  }
  return null;
};

// Clear performance marks and measures
export const clearPerformanceMarks = (): void => {
  if (typeof window !== 'undefined' && window.performance) {
    if (window.performance.clearMarks) {
      window.performance.clearMarks();
    }
    if (window.performance.clearMeasures) {
      window.performance.clearMeasures();
    }
  }
};

// Get Web Vitals metrics
export const getWebVitals = (): void => {
  if (typeof window === 'undefined') return;

  // First Contentful Paint (FCP)
  const paintEntries = window.performance?.getEntriesByType?.('paint');
  const fcp = paintEntries?.find((entry) => entry.name === 'first-contentful-paint');
  
  if (fcp) {
    console.log('First Contentful Paint (FCP):', `${fcp.startTime.toFixed(2)}ms`);
  }

  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        console.log('Largest Contentful Paint (LCP):', `${lastEntry.startTime.toFixed(2)}ms`);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      // Observer not supported
    }
  }

  // First Input Delay (FID)
  if ('PerformanceObserver' in window) {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          console.log('First Input Delay (FID):', `${entry.processingStart - entry.startTime}ms`);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      // Observer not supported
    }
  }

  // Time to Interactive (TTI) - approximation
  if (window.performance?.timing) {
    const timing = window.performance.timing;
    const tti = timing.domInteractive - timing.navigationStart;
    console.log('Time to Interactive (TTI):', `${tti}ms`);
  }
};

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Report bundle size (for development)
export const reportBundleSize = (): void => {
  if (typeof window === 'undefined' || !window.performance) return;

  const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  let totalSize = 0;
  
  const sizes: Record<string, number> = {
    scripts: 0,
    stylesheets: 0,
    images: 0,
    fonts: 0,
    other: 0,
  };

  resources.forEach((resource) => {
    const size = resource.encodedBodySize || 0;
    totalSize += size;

    if (resource.name.endsWith('.js')) {
      sizes.scripts += size;
    } else if (resource.name.endsWith('.css')) {
      sizes.stylesheets += size;
    } else if (resource.name.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
      sizes.images += size;
    } else if (resource.name.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
      sizes.fonts += size;
    } else {
      sizes.other += size;
    }
  });

  console.group('📦 Bundle Size Report');
  console.log('Total:', `${(totalSize / 1024).toFixed(2)} KB`);
  console.log('Scripts:', `${(sizes.scripts / 1024).toFixed(2)} KB`);
  console.log('Stylesheets:', `${(sizes.stylesheets / 1024).toFixed(2)} KB`);
  console.log('Images:', `${(sizes.images / 1024).toFixed(2)} KB`);
  console.log('Fonts:', `${(sizes.fonts / 1024).toFixed(2)} KB`);
  console.log('Other:', `${(sizes.other / 1024).toFixed(2)} KB`);
  console.groupEnd();
};

// Memory usage monitoring (Chrome only)
export const reportMemoryUsage = (): void => {
  if (typeof window === 'undefined') return;

  const memory = (performance as any).memory;
  if (memory) {
    console.group('💾 Memory Usage');
    console.log('Used:', `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
    console.log('Total:', `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`);
    console.log('Limit:', `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`);
    console.groupEnd();
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = (): void => {
  if (typeof window === 'undefined') return;

  // Log Web Vitals
  if (document.readyState === 'complete') {
    getWebVitals();
  } else {
    window.addEventListener('load', getWebVitals);
  }

  // Report bundle size after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        reportBundleSize();
        reportMemoryUsage();
      }
    }, 1000);
  });
};
