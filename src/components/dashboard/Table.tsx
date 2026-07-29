"use client";

import React, { useState } from "react";
import Badge from "../uilib/Badge";
import { FilterIcon, MoreVerticalIcon } from "../uilib/Icons";
import { formatUserDate } from "@/utils/date";
import { User } from "@/services/api";
import TableFilter from "./TableFilter";
import RowActionsPopover from "./RowActionsPopover";
import styles from "../../styles/dashboard/Table.module.scss";

interface TableProps {
  users: User[];
  onRowClick: (user: User) => void;
  onFilterApply: (filters: Record<string, string>) => void;
  onFilterReset: () => void;
  onStatusChange: () => void;
}

export default function Table({
  users,
  onRowClick,
  onFilterApply,
  onFilterReset,
  onStatusChange,
}: TableProps) {
  const [activeFilterCol, setActiveFilterCol] = useState<string | null>(null);
  const [activeActionUserId, setActiveActionUserId] = useState<string | null>(null);

  const columns = [
    { key: "orgName", label: "Organization", hideClass: styles.hideTablet },
    { key: "userName", label: "Username", hideClass: "" },
    { key: "email", label: "Email", hideClass: styles.hideMobile },
    { key: "phoneNumber", label: "Phone Number", hideClass: styles.hideTablet },
    { key: "createdAt", label: "Date Joined", hideClass: styles.hideTablet },
    { key: "status", label: "Status", hideClass: "" },
  ];

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    e.stopPropagation();
    setActiveActionUserId(activeActionUserId === userId ? null : userId);
  };

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>, colKey: string) => {
    e.stopPropagation();
    setActiveFilterCol(activeFilterCol === colKey ? null : colKey);
  };

  const handleRowClick = (user: User) => {
    onRowClick(user);
  };

  const getUserStatus = (user: User) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`lendsqr_user_status_${user.id}`);
      if (saved) return saved;
    }
    return user.status;
  };

  const handleBlacklist = (userId: string) => {
    localStorage.setItem(`lendsqr_user_status_${userId}`, "blacklisted");
    onStatusChange();
  };

  const handleActivate = (userId: string) => {
    localStorage.setItem(`lendsqr_user_status_${userId}`, "active");
    onStatusChange();
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={`${styles.th} ${col.hideClass}`} style={{ position: "relative" }}>
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
                {activeFilterCol === col.key && (
                  <TableFilter
                    onFilter={onFilterApply}
                    onReset={onFilterReset}
                    onClose={() => setActiveFilterCol(null)}
                  />
                )}
              </th>
            ))}
            <th className={`${styles.th} ${styles.hideMobile}`}></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const currentStatus = getUserStatus(user);
            const displayUser = { ...user, status: currentStatus as any };

            return (
              <tr
                key={user.id}
                className={styles.tr}
                onClick={() => handleRowClick(displayUser)}
              >
                <td className={`${styles.td} ${styles.hideTablet}`}>{user.orgName}</td>
                <td className={styles.td}>{user.userName}</td>
                <td className={`${styles.td} ${styles.hideMobile}`}>{user.email}</td>
                <td className={`${styles.td} ${styles.hideTablet}`}>{user.phoneNumber}</td>
                <td className={`${styles.td} ${styles.hideTablet}`}>
                  {formatUserDate(user.createdAt)}
                </td>
                <td className={styles.td}>
                  <Badge status={currentStatus} />
                </td>
                <td className={`${styles.td} ${styles.actionCell} ${styles.hideMobile}`}>
                  <button
                    className={styles.actionBtn}
                    onClick={(e) => handleActionClick(e, user.id)}
                    aria-label="User actions"
                  >
                    <MoreVerticalIcon size={16} />
                  </button>

                  {activeActionUserId === user.id && (
                    <RowActionsPopover
                      userId={user.id}
                      onClose={() => setActiveActionUserId(null)}
                      onBlacklist={() => handleBlacklist(user.id)}
                      onActivate={() => handleActivate(user.id)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

