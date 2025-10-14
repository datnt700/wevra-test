import { useEffect, DependencyList, useCallback } from 'react';

export function useDebounceEffect(fn: () => void, waitTime: number, deps: DependencyList = []) {
  const callback = useCallback(fn, deps); // Memoize the function based on dependencies

  useEffect(() => {
    const t = setTimeout(() => {
      callback();
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, [callback, waitTime]);
}
