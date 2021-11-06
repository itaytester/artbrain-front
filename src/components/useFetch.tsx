import axios from "axios";
import { useEffect, useState, useCallback } from "react";

function useFetch<RequestType, ResponseType>(
  url:string, body: RequestType | null): [
  isLoading: boolean,
  isError: boolean,
  data: ResponseType | ResponseType[] | null,
  fetch: () => Promise<void>
] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<ResponseType | ResponseType[] | null>(null);
  const fetch = useCallback(async () => {
    setIsLoading(true);
      try {
        const response = await axios.get<
          ResponseType | ResponseType[] | null
        >(`${url as string}/${body? body: ""}`);
        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
      }
  },[url, body]);

  useEffect(() => {
    fetch();
  }, [url, fetch]);

  return [isLoading, isError, data, fetch];
}

export default useFetch;
