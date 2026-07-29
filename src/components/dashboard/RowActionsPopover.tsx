"use client";

import React from "react";
import Link from "next/link";
import { UserIcon, UserCheckIcon, UserXIcon } from "../uilib/Icons";
import styles from "../../styles/dashboard/RowActionsPopover.module.scss";

interface RowActionsPopoverProps {
  userId: string;
  onClose: () => void;
  onBlacklist: () => void;
  onActivate: () => void;
}

export default function RowActionsPopover({
  userId,
  onClose,
  onBlacklist,
  onActivate,
}: RowActionsPopoverProps) {
  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
        <Link href={`/dashboard/users/${userId}`} className={styles.item} onClick={onClose}>
          <span className={styles.icon}>
            <UserIcon size={16} />
          </span>
          View Details
        </Link>
        <button
          type="button"
          className={styles.item}
          onClick={() => {
            onBlacklist();
            onClose();
          }}
        >
          <span className={styles.icon}>
            <UserXIcon size={16} />
          </span>
          Blacklist User
        </button>
        <button
          type="button"
          className={styles.item}
          onClick={() => {
            onActivate();
            onClose();
          }}
        >
          <span className={styles.icon}>
            <UserCheckIcon size={16} />
          </span>
          Activate User
        </button>
      </div>
    </>
  );
}
