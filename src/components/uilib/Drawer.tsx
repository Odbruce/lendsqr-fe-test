"use client";

import React, { useEffect } from "react";
import Portal from "./Portal";
import styles from "../../styles/uilib/Drawer.module.scss";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position: "left" | "bottom" | "right";
  children: React.ReactNode;
  showCloseButton?: boolean;
}


export default function Drawer({
  isOpen,
  onClose,
  position,
  children,
  showCloseButton = true,
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const backdropClass = `${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`;
  const drawerClass = `${styles.drawer} ${styles[position]} ${
    isOpen ? styles[`${position}Open`] : ""
  }`;

  return (
    <Portal>
      <div className={backdropClass} onClick={onClose} />
      <div className={drawerClass}>
        {showCloseButton && (
          <button className={styles.closeButton} onClick={onClose} aria-label="Close drawer">
            &times;
          </button>
        )}
        {children}
      </div>
    </Portal>
  );
}
