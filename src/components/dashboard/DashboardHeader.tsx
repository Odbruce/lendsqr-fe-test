import React from "react";
import { UsersIcon, PiggyBankIcon, BriefcaseIcon } from "../uilib/Icons";
import { UserStats } from "@/services/api";
import styles from "../../styles/dashboard/Users.module.scss";

interface DashboardHeaderProps {
  stats?: UserStats;
  totalUsers: number;
}

export default function DashboardHeader({ stats, totalUsers }: DashboardHeaderProps) {
  return (
    <>
      <h1 className={styles.title}>Users</h1>

      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.iconUsers}`}>
            <UsersIcon size={20} />
          </div>
          <span className={styles.cardLabel}>Users</span>
          <span className={styles.cardValue}>
            {(stats?.users ?? totalUsers).toLocaleString()}
          </span>
        </div>
        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.iconActiveUsers}`}>
            <UsersIcon size={20} />
          </div>
          <span className={styles.cardLabel}>Active Users</span>
          <span className={styles.cardValue}>
            {(stats?.activeUsers ?? 0).toLocaleString()}
          </span>
        </div>
        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.iconLoanUsers}`}>
            <BriefcaseIcon size={20} />
          </div>
          <span className={styles.cardLabel}>Users with Loans</span>
          <span className={styles.cardValue}>
            {(stats?.usersWithLoans ?? 0).toLocaleString()}
          </span>
        </div>
        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.iconSavingsUsers}`}>
            <PiggyBankIcon size={20} />
          </div>
          <span className={styles.cardLabel}>Users with Savings</span>
          <span className={styles.cardValue}>
            {(stats?.usersWithSavings ?? 0).toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
}
