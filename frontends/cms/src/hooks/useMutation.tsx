import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";

export function useMutation<T, K>(
  asyncFunction: (params: K) => Promise<AxiosResponse<T>>
) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);

  const mutate = useCallback(
    async (params: K) => {
      if (mounted) {
        setLoading(true);
        setData(undefined);
        setError(undefined);
        try {
          const { data } = await asyncFunction(params);
          setData(data);
        } catch (err) {
          if (err.response) {
            setError(err.response);
          } else {
            setError(err);
          }
        } finally {
          setLoading(false);
        }
      }
    },
    [asyncFunction, mounted]
  );

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  return {
    data,
    error,
    loading,
    mutate,
  };
}
