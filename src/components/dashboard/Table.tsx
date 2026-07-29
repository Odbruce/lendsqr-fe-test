"use client";

import React from "react";
import Badge from "../uilib/Badge";
import { FilterIcon, MoreVerticalIcon } from "../uilib/Icons";
import { formatUserDate } from "@/utils/date";
import { User } from "@/services/api";
import styles from "../../styles/dashboard/Table.module.scss";

interface TableProps {
  users: User[];
  onRowClick: (user: User) => void;
  onActionClick: (user: User, element: HTMLButtonElement) => void;
  onFilterClick: (columnKey: string, element: HTMLButtonElement) => void;
}

export default function Table({
  users,
  onRowClick,
  onActionClick,
  onFilterClick,
}: TableProps) {
  const columns = [
    { key: "orgName", label: "Organization", hideClass: styles.hideTablet },
    { key: "userName", label: "Username", hideClass: "" },
    { key: "email", label: "Email", hideClass: styles.hideMobile },
    { key: "phoneNumber", label: "Phone Number", hideClass: styles.hideTablet },
    { key: "createdAt", label: "Date Joined", hideClass: styles.hideTablet },
    { key: "status", label: "Status", hideClass: "" },
  ];

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, user: User) => {
    e.stopPropagation();
    onActionClick(user, e.currentTarget);
  };

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>, colKey: string) => {
    e.stopPropagation();
    onFilterClick(colKey, e.currentTarget);
  };

  const handleRowClick = (user: User) => {
    onRowClick(user);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={`${styles.th} ${col.hideClass}`}>
                <div className={styles.thContent}>
                  {col.label}
                  <button
                    className={styles.filterBtn}
                    onClick={(e) => handleFilterClick(e, col.key)}
                    aria-label={`Filter by ${col.label}`}
                  >
                    <FilterIcon size={14} />
                  </button>
                </div>
              </th>
            ))}
            <th className={`${styles.th} ${styles.hideMobile}`}></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={styles.tr}
              onClick={() => handleRowClick(user)}
            >
              <td className={`${styles.td} ${styles.hideTablet}`}>{user.orgName}</td>
              <td className={styles.td}>{user.userName}</td>
              <td className={`${styles.td} ${styles.hideMobile}`}>{user.email}</td>
              <td className={`${styles.td} ${styles.hideTablet}`}>{user.phoneNumber}</td>
              <td className={`${styles.td} ${styles.hideTablet}`}>
                {formatUserDate(user.createdAt)}
              </td>
              <td className={styles.td}>
                <Badge status={user.status} />
              </td>
              <td className={`${styles.td} ${styles.actionCell} ${styles.hideMobile}`}>
                <button
                  className={styles.actionBtn}
                  onClick={(e) => handleActionClick(e, user)}
                  aria-label="User actions"
                >
                  <MoreVerticalIcon size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
