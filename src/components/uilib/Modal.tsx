"use client";

import React, { useEffect } from "react";
import Portal from "./Portal";
import styles from "../../styles/uilib/Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeOnOverlayClick = true,
  footer,
}: ModalProps) {
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

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      <div
        className={`${styles.overlay} ${styles.overlayOpen}`}
        onClick={handleOverlayClick}
      >
        <div className={`${styles.modal} ${styles.modalOpen}`}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
          
          {title && <div className={styles.header}>{title}</div>}
          
          <div className={styles.body}>{children}</div>
          
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </Portal>
  );
}
