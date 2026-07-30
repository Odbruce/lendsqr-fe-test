
import { UserStats } from "@/services/api";
import styles from "../../styles/dashboard/Users.module.scss";
import { GroupUsersIcon, ReceiptStackIcon, StackedCoinIcon, UsersIcon } from "../assets/userOverview";

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
          <UsersIcon />
          <span className={styles.cardLabel}>Users</span>
          <span className={styles.cardValue}>
            {(stats?.users ?? totalUsers).toLocaleString()}
          </span>
        </div>
        <div className={styles.card}>
          <GroupUsersIcon />
          <span className={styles.cardLabel}>Active Users</span>
          <span className={styles.cardValue}>
            {(stats?.activeUsers ?? 0).toLocaleString()}
          </span>
        </div>
        <div className={styles.card}>

          <ReceiptStackIcon />

          <span className={styles.cardLabel}>Users with Loans</span>
          <span className={styles.cardValue}>
            {(stats?.usersWithLoans ?? 0).toLocaleString()}
          </span>
        </div>
        <div className={styles.card}>
          <StackedCoinIcon />
          <span className={styles.cardLabel}>Users with Savings</span>
          <span className={styles.cardValue}>
            {(stats?.usersWithSavings ?? 0).toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
}
