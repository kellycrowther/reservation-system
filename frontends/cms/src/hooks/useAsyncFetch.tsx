import { AxiosResponse } from "axios";
import { useEffect, useState, useCallback } from "react";

export function useAsync(asyncFunction: () => Promise<AxiosResponse<any>>) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      const { data } = await asyncFunction();
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
  }, [asyncFunction]);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    error,
    loading,
    execute,
  };
}
