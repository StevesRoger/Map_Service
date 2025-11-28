import { useState, useEffect, useCallback, useRef } from 'react';

interface UseOptimizedDataOptions<T> {
  fetchFn: () => Promise<T>;
  deps?: any[];
  cacheKey?: string;
  cacheDuration?: number; // in milliseconds
  onError?: (error: Error) => void;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// In-memory cache for data
const dataCache = new Map<string, CacheEntry<any>>();

/**
 * Custom hook for optimized data fetching with caching
 */
export function useOptimizedData<T>({
  fetchFn,
  deps = [],
  cacheKey,
  cacheDuration = 5 * 60 * 1000, // 5 minutes default
  onError,
}: UseOptimizedDataOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    // Check cache first
    if (cacheKey) {
      const cached = dataCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < cacheDuration) {
        setData(cached.data);
        setIsLoading(false);
        return;
      }
    }

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      
      if (isMountedRef.current) {
        setData(result);
        setIsLoading(false);

        // Update cache
        if (cacheKey) {
          dataCache.set(cacheKey, {
            data: result,
            timestamp: Date.now(),
          });
        }
      }
    } catch (err) {
      if (isMountedRef.current && err instanceof Error && err.name !== 'AbortError') {
        const error = err as Error;
        setError(error);
        setIsLoading(false);
        onError?.(error);
      }
    }
  }, [fetchFn, cacheKey, cacheDuration, onError]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchData();

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = useCallback(() => {
    // Clear cache for this key
    if (cacheKey) {
      dataCache.delete(cacheKey);
    }
    fetchData();
  }, [fetchData, cacheKey]);

  return { data, isLoading, error, refetch };
}

/**
 * Clear all cached data
 */
export function clearDataCache() {
  dataCache.clear();
}

/**
 * Clear specific cache entry
 */
export function clearCacheEntry(key: string) {
  dataCache.delete(key);
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: dataCache.size,
    keys: Array.from(dataCache.keys()),
  };
}
