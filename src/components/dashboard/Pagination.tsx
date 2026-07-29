"use client";

import React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "../uilib/Icons";
import styles from "../../styles/dashboard/Pagination.module.scss";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export default function Pagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit) || 1;

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.leftSection}>
        <span>Showing</span>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={limit}
            onChange={handleLimitChange}
            aria-label="Items per page"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className={styles.selectIcon}>
            <ChevronDownIcon size={10} />
          </span>
        </div>
        <span>out of {total}</span>
      </div>

      <div className={styles.rightSection}>
        <button
          className={styles.navBtn}
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeftIcon size={14} />
        </button>

        <div className={styles.pagesList}>
          {getPageNumbers().map((num, i) => {
            if (num === "...") {
              return (
                <span key={`ellipsis-${i}`} className={`${styles.pageNumber} styles.ellipsis`}>
                  ...
                </span>
              );
            }

            return (
              <button
                key={`page-${num}`}
                className={`${styles.pageNumber} ${page === num ? styles.active : ""}`}
                onClick={() => onPageChange(num as number)}
              >
                {num}
              </button>
            );
          })}
        </div>

        <button
          className={styles.navBtn}
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}
