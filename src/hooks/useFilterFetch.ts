import { notification } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";

export const useFilterFetch = ({
  fetchCB,
  errorMessage,
  successCB,
  params,
}: {
  fetchCB: any;
  errorMessage: string;
  successCB?: any;
  params?: any;
}) => {
  const { filters: paramsFilters, ...parameters } = params;

  const initialFilters = {
    search: "",
    page: 1,
    limit: 10,
    orderBy: "createdAt",
    orderDirection: "desc",
    ...paramsFilters,
  };

  const [filters, setFilters] = useState(initialFilters);
  const [totalPages, setTotalPages] = useState(0);

  const result = fetchCB(
    { ...parameters, filters },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (result.isSuccess) {
      setTotalPages(Math.ceil(result.data.count / filters.limit));
      successCB && successCB();
    }
    if (result.isError) {
      const message = errorMessage || result.error.data.message;
      notification.error({ message, placement: "topRight", duration: 2.5 });
    }
  }, [result]);

  return [result, totalPages, setFilters];
};
