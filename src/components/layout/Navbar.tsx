"use client";

import React from "react";
import Link from "next/link";
import { Logo, HamburgerIcon, SearchIcon, BellIcon, ChevronDownIcon } from "../uilib/Icons";
import styles from "../../styles/layout/Navbar.module.scss";

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        <button
          className={styles.menuBtn}
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
        >
          <HamburgerIcon size={24} />
        </button>
        <Link href="/dashboard" className={styles.logoWrapper}>
          <Logo width={144.8} height={25} />
        </Link>
      </div>

      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for anything"
          className={styles.searchInput}
        />
        <button type="button" className={styles.searchBtn} aria-label="Search button">
          <SearchIcon size={16} />
        </button>
      </div>

      <div className={styles.rightSection}>
        <Link href="#" className={styles.docsLink}>
          Docs
        </Link>
        <button className={styles.bellButton} aria-label="Notifications">
          <BellIcon size={22} />
        </button>
        <div className={styles.userProfile}>
          <img
            src="https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/36.jpg"
            alt="Laura profile"
            className={styles.avatar}
          />
          <span className={styles.userName}>
            Laura
            <ChevronDownIcon size={10} />
          </span>
        </div>
      </div>
    </header>
  );
}
