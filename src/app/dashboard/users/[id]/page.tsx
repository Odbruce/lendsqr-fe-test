"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";
import { StarIcon } from "@/components/uilib/Icons";
import { Skeleton } from "@/components/uilib/Skeleton";
import Button from "@/components/uilib/Button";
import { formatNaira } from "@/utils/amount";
import styles from "@/styles/dashboard/UserDetails.module.scss";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UserDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { id } = use(params);

  const { user, isLoading, error, blacklist, activate } = useUserData(id);

  const activeTab = searchParams.get("tab") || "general-details";

  const handleTabChange = (tabKey: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", tabKey);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const tabs = [
    { key: "general-details", label: "General Details" },
    { key: "documents", label: "Documents" },
    { key: "bank-details", label: "Bank Details" },
    { key: "loans", label: "Loans" },
    { key: "savings", label: "Savings" },
    { key: "app-and-system", label: "App and System" },
  ];

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.backLink}>
          <Skeleton width="120px" height="16px" />
        </div>
        <div className={styles.headerRow}>
          <Skeleton width="200px" height="30px" />
          <div style={{ display: "flex", gap: "20px", width: "300px" }}>
            <Skeleton width="140px" height="40px" />
            <Skeleton width="140px" height="40px" />
          </div>
        </div>
        <div className={styles.headerCard} style={{ height: "200px", padding: "30px" }}>
          <Skeleton width="100%" height="100%" />
        </div>
        <div className={styles.detailsCard} style={{ height: "400px" }}>
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.pageContainer}>
        <Link href="/dashboard" className={styles.backLink}>
          &larr; Back to Users
        </Link>
        <div className={styles.detailsCard}>
          <h2 style={{ color: "#E4033B", marginBottom: "16px" }}>Error Loading Profile</h2>
          <p>The profile details could not be found or could not load at this time.</p>
          <Button href="/dashboard" variant="primary" style={{ marginTop: "20px" }}>
            Return to Directory
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Link href="/dashboard" className={styles.backLink}>
        &larr; Back to Users
      </Link>

      <div className={styles.headerRow}>
        <h1 className={styles.title}>User Details</h1>
        <div className={styles.actions}>
          <Button variant="dangerOutline" onClick={blacklist}>
            Blacklist User
          </Button>
          <Button variant="primaryOutline" onClick={activate}>
            Activate User
          </Button>
        </div>
      </div>

      <div className={styles.headerCard}>
        <div className={styles.profileSummary}>
          <div className={styles.avatarWrapper}>
            <img
              src={user.profile.avatar || "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/36.jpg"}
              alt={`${user.profile.firstName} ${user.profile.lastName}`}
            />
          </div>
          
          <div className={styles.nameCol}>
            <span className={styles.name}>
              {user.profile.firstName} {user.profile.lastName}
            </span>
            <span className={styles.userId}>{user.id}</span>
          </div>

          <div className={styles.verticalDivider}></div>

          <div className={styles.tierCol}>
            <span className={styles.tierLabel}>User's Tier</span>
            <div className={styles.stars}>
              <StarIcon size={14} />
              <StarIcon size={14} style={{ opacity: 0.2 }} />
              <StarIcon size={14} style={{ opacity: 0.2 }} />
            </div>
          </div>

          <div className={styles.verticalDivider}></div>

          <div className={styles.balanceCol}>
            <span className={styles.balance}>{formatNaira(user.profile.accountBalance)}</span>
            <span className={styles.bankInfo}>
              {user.profile.accountNumber}/{user.profile.bankName}
            </span>
          </div>
        </div>

        <div className={styles.tabsList}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabItem} ${activeTab === tab.key ? styles.activeTab : ""}`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.detailsCard}>
        {activeTab === "general-details" ? (
          <>
            <div className={styles.infoSection}>
              <h3 className={styles.sectionTitle}>Personal Information</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Full Name</span>
                  <span className={styles.value}>
                    {user.profile.firstName} {user.profile.lastName}
                  </span>
                </div>
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
                  <span className={styles.label}>Type of Residence</span>
                  <span className={styles.value}>{user.profile.residenceType}</span>
                </div>
              </div>
            </div>

            <div className={styles.infoSection}>
              <h3 className={styles.sectionTitle}>Education and Employment</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Level of Education</span>
                  <span className={styles.value}>{user.education.levelOfEducation}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Employment Status</span>
                  <span className={styles.value}>{user.education.employmentStatus}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Sector of Employment</span>
                  <span className={styles.value}>{user.education.sectorOfEmployment}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Duration of Employment</span>
                  <span className={styles.value}>{user.education.durationOfEmployment}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Office Email</span>
                  <span className={styles.value}>{user.education.officeEmail}</span>
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

            <div className={styles.infoSection}>
              <h3 className={styles.sectionTitle}>Socials</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Twitter</span>
                  <span className={styles.value}>{user.socials.twitter || "N/A"}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Facebook</span>
                  <span className={styles.value}>{user.socials.facebook || "N/A"}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Instagram</span>
                  <span className={styles.value}>{user.socials.instagram || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className={styles.infoSection}>
              <h3 className={styles.sectionTitle}>Guarantor</h3>
              <div className={styles.infoGrid}>
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
                  <span className={styles.label}>Email Address</span>
                  <span className={styles.value}>{user.guarantor.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Relationship</span>
                  <span className={styles.value}>{user.guarantor.relationship}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: "40px 0", textAlign: "center", color: "#545F7D" }}>
            <h3 style={{ marginBottom: "8px", textTransform: "capitalize" }}>
              {activeTab.replace("-", " ")}
            </h3>
            <p>There are no recorded files or details for this tab category at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
