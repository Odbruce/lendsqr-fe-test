import React from "react";
import styles from "../../styles/uilib/Badge.module.scss";

export type BadgeStatus = "active" | "inactive" | "pending" | "blacklisted";

interface BadgeProps {
  status: BadgeStatus | string;
}

export default function Badge({ status }: BadgeProps) {
  const normalizedStatus = status.toLowerCase() as BadgeStatus;
  const badgeClass = `${styles.badge} ${styles[normalizedStatus] || styles.inactive}`;
  
  return <span className={badgeClass}>{status}</span>;
}
