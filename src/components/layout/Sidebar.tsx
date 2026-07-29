"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseIcon,
  ChevronDownIcon,
  HomeIcon,
  UsersIcon,
  HandshakeIcon,
  ScalesIcon,
  PiggyBankIcon,
  RequestIcon,
  UserCheckIcon,
  UserXIcon,
  PercentIcon,
  ClipboardListIcon,
  SlidersIcon,
  LogOutIcon,
} from "../uilib/Icons";
import styles from "../../styles/layout/Sidebar.module.scss";

export default function Sidebar() {
  const pathname = usePathname();

  const isUsersActive = pathname === "/dashboard" || pathname.startsWith("/dashboard/users");

  return (
    <aside className={styles.sidebar}>
      <div className={styles.orgSelector}>
        <BriefcaseIcon size={16} />
        <span>Switch Organization</span>
        <ChevronDownIcon size={10} />
      </div>

      <Link
        href="/dashboard"
        className={`${styles.navItem} ${pathname === "/dashboard-home" ? styles.active : ""}`}
      >
        <span className={styles.icon}>
          <HomeIcon size={16} />
        </span>
        Dashboard
      </Link>

      <div className={styles.navSection}>
        <h3 className={styles.sectionHeader}>Customers</h3>
        <Link
          href="/dashboard"
          className={`${styles.navItem} ${isUsersActive ? styles.active : ""}`}
        >
          <span className={styles.icon}>
            <UsersIcon size={16} />
          </span>
          Users
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <UsersIcon size={16} />
          </span>
          Guarantors
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <HandshakeIcon size={16} />
          </span>
          Loans
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <ScalesIcon size={16} />
          </span>
          Decision Models
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <PiggyBankIcon size={16} />
          </span>
          Savings
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <RequestIcon size={16} />
          </span>
          Loan Requests
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <UserCheckIcon size={16} />
          </span>
          Whitelist
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <UserXIcon size={16} />
          </span>
          Karma
        </Link>
      </div>

      <div className={styles.navSection}>
        <h3 className={styles.sectionHeader}>Businesses</h3>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <BriefcaseIcon size={16} />
          </span>
          Organization
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <RequestIcon size={16} />
          </span>
          Loan Products
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <PiggyBankIcon size={16} />
          </span>
          Savings Products
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <PercentIcon size={16} />
          </span>
          Fees and Charges
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <ClipboardListIcon size={16} />
          </span>
          Transactions
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <SlidersIcon size={16} />
          </span>
          Services
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <UsersIcon size={16} />
          </span>
          Service Account
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <ClipboardListIcon size={16} />
          </span>
          Settlements
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <SlidersIcon size={16} />
          </span>
          Reports
        </Link>
      </div>

      <div className={styles.navSection}>
        <h3 className={styles.sectionHeader}>Settings</h3>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <SlidersIcon size={16} />
          </span>
          Preferences
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <PercentIcon size={16} />
          </span>
          Fees and Pricing
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <ClipboardListIcon size={16} />
          </span>
          Audit Logs
        </Link>
      </div>

      <div className={styles.logoutSection}>
        <Link href="/login" className={styles.navItem}>
          <span className={styles.icon}>
            <LogOutIcon size={16} />
          </span>
          Logout
        </Link>
        <div className={styles.version}>v1.2.0</div>
      </div>
    </aside>
  );
}
