"use client";

import React, { useState } from "react";
import Badge from "../uilib/Badge";

import { FilterIcon, MoreVerticalIcon } from "../uilib/Icons";
import { formatUserDate } from "@/utils/date";
import { User } from "@/services/api";
import RowActionsPopover from "./RowActionsPopover";
import styles from "../../styles/dashboard/Table.module.scss";

interface TableProps {
  users: User[];
  onRowClick: (user: User) => void;
  onStatusChange: () => void;
}

export default function Table({
  users,
  onRowClick,
  onStatusChange,
}: TableProps) {
  const [activeActionUserId, setActiveActionUserId] = useState<string | null>(null);
  const [popoverAlignUpwards, setPopoverAlignUpwards] = useState(false);

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
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const popoverHeight = 160;
    setPopoverAlignUpwards(spaceBelow < popoverHeight);
    setActiveActionUserId(activeActionUserId === userId ? null : userId);
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
              <th key={col.key} className={`${styles.th} ${col.hideClass}`}>
                <div className={styles.thContent}>
                  {col.label}
                </div>
              </th>
            ))}
            <th className={`${styles.th} ${styles.hideMobile}`}></th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className={styles.emptyStateCell}>
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <FilterIcon size={32} />
                  </div>
                  <h3>No results found</h3>
                  <p>We couldn't find any users matching your filter criteria.</p>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => {
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
                        alignUpwards={popoverAlignUpwards}
                      />
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );

}

