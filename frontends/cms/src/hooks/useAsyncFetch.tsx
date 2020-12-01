import axios from "axios";
import { useEffect, useState, useCallback } from "react";

interface UseFetch {
  immediatelyInvoke: boolean;
}

export function useFetch<R>(
  url: string,
  params: any,
  options: UseFetch = { immediatelyInvoke: true }
) {
  const [data, setData] = useState<R>();
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(url, params);
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
  }, [params, url]);

  useEffect(() => {
    let mounted = true;

    if (mounted && options.immediatelyInvoke) {
      fetch();
    }

    return () => {
      mounted = false;
    };
  }, [fetch, options.immediatelyInvoke]);
  return { data, error, loading, fetch };
}
