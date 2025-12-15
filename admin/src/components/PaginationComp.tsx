import { Pagination, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";

type PropTypes = {
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number, pageSize: number) => void;
};

const LOCAL_STORAGE_KEY = "currentPage";

export default function PaginationComp({
  pageSize = 10,
  onPageChange,
  total,
}: PropTypes) {
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? Number(saved) : 1;
    }
    return 1;
  });

  useEffect(() => {
    onPageChange?.(currentPage, pageSize);
  }, []);

  const handleChange: PaginationProps["onChange"] = (page, size) => {
    setCurrentPage(page);
    localStorage.setItem(LOCAL_STORAGE_KEY, String(page));
    onPageChange?.(page, size);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ef4444", // đỏ cinema
          colorText: "#ffffff",
          colorTextSecondary: "#9ca3af",
          colorBgContainer: "#1e2939",
          colorBorder: "#374151",
        },
      }}
    >
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={handleChange}
        align="center"
        showSizeChanger={false}
        className="dark-pagination"
      />
    </ConfigProvider>
  );
}
