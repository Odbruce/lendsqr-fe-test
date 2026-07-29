"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Drawer from "../uilib/Drawer";
import styles from "../../styles/layout/LayoutShell.module.scss";

interface LayoutShellProps {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.shell}>
      <Navbar onMenuToggle={toggleMobileMenu} />

      <div className={styles.mainContainer}>
        <div className={styles.sidebarWrapper}>
          <Sidebar />
        </div>

        <Drawer
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          position="left"
          showCloseButton={true}
        >
          <div className={styles.mobileSidebarContainer} onClick={closeMobileMenu}>
            <Sidebar />
          </div>
        </Drawer>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
