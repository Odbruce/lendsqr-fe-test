"use client";

import React from "react";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import {

  ChevronDownIcon,
} from "../uilib/Icons";
import styles from "../../styles/layout/Sidebar.module.scss";
import { BarChartIcon, BriefcaseIcon, ClipboardListIcon, DoubleUsersIcon, GalaxyIcon, GroupUsersIcon, HandshakeIcon, HomeIcon, LogOutIcon, MultiSliderIcon, PercentIcon, PiggyBankIcon, RequestIcon, SackIcon, SavingHouseIcon, ScrollIcon, StackedCoinIcon, TransactIcon, UserCheckIcon, UserGearIcon, UserXIcon, WheelIcon } from "../assets/sideBar";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("lendsqr_session_token");
    router.push("/login");
  };

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
            <DoubleUsersIcon size={16} />
          </span>
          Users
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <GroupUsersIcon size={16} />
          </span>
          Guarantors
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <SackIcon size={16} />
          </span>
          Loans
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <HandshakeIcon size={16} />
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
            <SavingHouseIcon size={16} />
          </span>
          Savings Products
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <StackedCoinIcon size={16} />
          </span>
          Fees and Charges
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <TransactIcon size={16} />
          </span>
          Transactions
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <GalaxyIcon size={16} />
          </span>
          Services
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <UserGearIcon size={16} />
          </span>
          Service Account
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <ScrollIcon size={16} />
          </span>
          Settlements
        </Link>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <BarChartIcon size={16} />
          </span>
          Reports
        </Link>
      </div>

      <div className={styles.navSection}>
        <h3 className={styles.sectionHeader}>Settings</h3>
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <MultiSliderIcon size={16} />
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
        <Link href="#" className={styles.navItem}>
          <span className={styles.icon}>
            <WheelIcon size={16} />
          </span>
          System Messages
        </Link>
      </div>

      <div className={styles.logoutSection}>
        <Link href="/login" className={styles.navItem} onClick={handleLogout}>
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
