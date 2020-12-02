import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";

interface UseFetch {
  immediatelyInvoke: boolean;
}

function configToObject(config: AxiosRequestConfig | string) {
  if (typeof config === "string") {
    return {
      url: config,
    };
  }

  return config;
}

export function useAxios<R>(
  config: AxiosRequestConfig | string,
  options: UseFetch = { immediatelyInvoke: true }
) {
  const [data, setData] = useState<R>();
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const axiosConfig = useMemo(
    () => configToObject(config),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(config)]
  );

  const execute = useCallback(
    async (payloadData?) => {
      setLoading(true);
      try {
        const { data } = await axios({ ...axiosConfig, ...payloadData });
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
    [axiosConfig]
  );

  useEffect(() => {
    let mounted = true;

    if (mounted && options.immediatelyInvoke) {
      execute();
    }

    return () => {
      mounted = false;
    };
  }, [execute, options.immediatelyInvoke]);
  return { data, error, loading, execute };
}
