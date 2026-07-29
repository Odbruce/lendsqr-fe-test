"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import Portal from "./Portal";
import styles from "../../styles/uilib/Toast.module.scss";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextType {
  toast: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string, title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, type, title, message };
    
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const success = useCallback((message: string, title?: string) => addToast("success", message, title || "Success"), [addToast]);
  const error = useCallback((message: string, title?: string) => addToast("error", message, title || "Error"), [addToast]);
  const warning = useCallback((message: string, title?: string) => addToast("warning", message, title || "Warning"), [addToast]);
  const info = useCallback((message: string, title?: string) => addToast("info", message, title || "Info"), [addToast]);

  useEffect(() => {
    const handleQueryError = (e: Event) => {
      const customEvent = e as CustomEvent;
      error(customEvent.detail || "Failed to fetch resource", "Network Failure");
    };
    window.addEventListener("lendsqr-query-error", handleQueryError);
    return () => window.removeEventListener("lendsqr-query-error", handleQueryError);
  }, [error]);

  return (
    <ToastContext.Provider value={{ toast: { success, error, warning, info } }}>
      {children}
      <Portal>
        <div className={styles.container}>
          {toasts.map((item) => (
            <div key={item.id} className={`${styles.toast} ${styles[item.type]}`}>
              <div className={styles.content}>
                {item.title && <span className={styles.title}>{item.title}</span>}
                <span className={styles.message}>{item.message}</span>
              </div>
              <button className={styles.closeButton} onClick={() => removeToast(item.id)}>
                &times;
              </button>
            </div>
          ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
}

