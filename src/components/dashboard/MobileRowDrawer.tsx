"use client";

import React from "react";
import Drawer from "../uilib/Drawer";
import Badge from "../uilib/Badge";
import Button from "../uilib/Button";
import { User } from "@/services/api";
import { formatNaira } from "@/utils/amount";
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
            <div style={{ marginTop: "6px" }}>
              <Badge status={user.status} />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Personal Information</h4>
          <div className={styles.grid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Phone Number</span>
              <span className={styles.value}>{user.phoneNumber}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email Address</span>
              <span className={styles.value}>{user.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>BVN</span>
              <span className={styles.value}>{user.profile.bvn}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Gender</span>
              <span className={styles.value}>{user.profile.gender}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Marital Status</span>
              <span className={styles.value}>{user.profile.maritalStatus}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Children</span>
              <span className={styles.value}>{user.profile.children}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Residence Type</span>
              <span className={styles.value}>{user.profile.residenceType}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Account Balance</span>
              <span className={styles.value}>{formatNaira(user.profile.accountBalance)}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Education and Employment</h4>
          <div className={styles.grid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Education Level</span>
              <span className={styles.value}>{user.education.levelOfEducation}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Employment Status</span>
              <span className={styles.value}>{user.education.employmentStatus}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Sector</span>
              <span className={styles.value}>{user.education.sectorOfEmployment}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Duration</span>
              <span className={styles.value}>{user.education.durationOfEmployment}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Monthly Income</span>
              <span className={styles.value}>
                {user.education.monthlyIncome
                  ? `${formatNaira(user.education.monthlyIncome[0])} - ${formatNaira(
                      user.education.monthlyIncome[1]
                    )}`
                  : "N/A"}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Loan Repayment</span>
              <span className={styles.value}>{formatNaira(user.education.loanRepayment)}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Guarantor</h4>
          <div className={styles.grid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Full Name</span>
              <span className={styles.value}>
                {user.guarantor.firstName} {user.guarantor.lastName}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Phone Number</span>
              <span className={styles.value}>{user.guarantor.phoneNumber}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Relationship</span>
              <span className={styles.value}>{user.guarantor.relationship}</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button href={`/dashboard/users/${user.id}`} variant="primary" fullWidth onClick={onClose}>
            View Full Details Page
          </Button>
          <div style={{ display: "flex", gap: "10px" }}>
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
