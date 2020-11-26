import { AxiosResponse } from "axios";
import { useEffect, useState, useCallback } from "react";

export function useAsync<T>(
  asyncFunction: (params?: any) => Promise<AxiosResponse<T>>,
  params?: any
) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (params?: any) => {
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
    },
    [asyncFunction]
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      execute();
    }
    return () => {
      mounted = false;
    };
  }, [execute]);

  return {
    data,
    error,
    loading,
    execute,
  };
}
