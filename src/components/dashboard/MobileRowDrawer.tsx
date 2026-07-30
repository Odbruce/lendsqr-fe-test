"use client";

import React from "react";
import Drawer from "../uilib/Drawer";

import Badge from "../uilib/Badge";
import Button from "../uilib/Button";
import { User } from "@/services/api";
import { formatUserDate } from "@/utils/date";
import styles from "../../styles/dashboard/MobileRowDrawer.module.scss";

interface MobileRowDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onBlacklist: () => void;
  onActivate: () => void;
}

export default function MobileRowDrawer({
  user,
  isOpen,
  onClose,
  onBlacklist,
  onActivate,
}: MobileRowDrawerProps) {
  if (!user) return null;

  const fields = [
    { label: "Organization", value: user.orgName },
    { label: "Username", value: user.userName },
    { label: "Email", value: user.email },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Date Joined", value: formatUserDate(user.createdAt) },
    { label: "Status", value: <Badge status={user.status} /> },
  ];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="bottom">
      <div className={styles.drawerContent}>
        <div className={styles.header}>
          <img
            src={user.profile.avatar || "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/36.jpg"}
            alt={`${user.profile.firstName} ${user.profile.lastName}`}
            className={styles.avatar}
          />
          <div className={styles.titleInfo}>
            <span className={styles.name}>
              {user.profile.firstName} {user.profile.lastName}
            </span>
            <span className={styles.userId}>ID: {user.id}</span>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.grid}>
            {fields.map((field, idx) => (
              <div key={idx} className={styles.infoItem}>
                <span className={styles.label}>{field.label}</span>
                <span className={styles.value}>{field.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <Button href={`/dashboard/users/${user.id}`} variant="primary" fullWidth onClick={onClose}>
            View Full Details Page
          </Button>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <Button
              variant="dangerOutline"
              fullWidth
              onClick={() => {
                onBlacklist();
                onClose();
              }}
            >
              Blacklist
            </Button>
            <Button
              variant="primaryOutline"
              fullWidth
              onClick={() => {
                onActivate();
                onClose();
              }}
            >
              Activate
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

