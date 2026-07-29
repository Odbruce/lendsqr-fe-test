"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/services/api";
import { UsersIcon, PiggyBankIcon, BriefcaseIcon } from "@/components/uilib/Icons";
import { SkeletonTable } from "@/components/uilib/Skeleton";
import Table from "@/components/dashboard/Table";
import Pagination from "@/components/dashboard/Pagination";
import styles from "@/styles/dashboard/Users.module.scss";

function UsersDashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || undefined;
  const orgName = searchParams.get("orgName") || undefined;
  const userName = searchParams.get("userName") || undefined;
  const email = searchParams.get("email") || undefined;
  const phoneNumber = searchParams.get("phoneNumber") || undefined;
  const status = searchParams.get("status") || undefined;
  const date = searchParams.get("date") || undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, limit, search, orgName, userName, email, phoneNumber, status, date],
    queryFn: () =>
      fetchUsers({
        page,
        limit,
        search,
        orgName,
        userName,
        email,
        phoneNumber,
        status,
        date,
      }),
  });

  const updateUrlParams = (newParams: Record<string, string | number | undefined | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === undefined || val === null || val === "") {
        params.delete(key);
      } else {
        params.set(key, val.toString());
      }
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    updateUrlParams({ page: newPage });
  };

  const handleLimitChange = (newLimit: number) => {
    updateUrlParams({ limit: newLimit, page: 1 });
  };

  const handleRowClick = (user: any) => {
    router.push(`/dashboard/users/${user.id}`);
  };

  const handleActionClick = (user: any, el: HTMLButtonElement) => {
    console.log("Action click placeholder:", user, el);
  };

  const handleFilterClick = (colKey: string, el: HTMLButtonElement) => {
    console.log("Filter click placeholder:", colKey, el);
  };

  const totalUsers = data?.total || 0;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Users</h1>

      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.iconUsers}`}>
            <UsersIcon size={20} />
          </div>
          <span className={styles.cardLabel}>Users</span>
          <span className={styles.cardValue}>{totalUsers.toLocaleString()}</span>
        </div>
        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.iconActiveUsers}`}>
            <UsersIcon size={20} />
          </div>
          <span className={styles.cardLabel}>Active Users</span>
          <span className={styles.cardValue}>{(totalUsers * 0.4).toFixed(0)}</span>
        </div>
        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.iconLoanUsers}`}>
            <BriefcaseIcon size={20} />
          </div>
          <span className={styles.cardLabel}>Users with Loans</span>
          <span className={styles.cardValue}>{(totalUsers * 0.15).toFixed(0)}</span>
        </div>
        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.iconSavingsUsers}`}>
            <PiggyBankIcon size={20} />
          </div>
          <span className={styles.cardLabel}>Users with Savings</span>
          <span className={styles.cardValue}>{(totalUsers * 0.65).toFixed(0)}</span>
        </div>
      </div>

      <div className={styles.tableSection}>
        {isLoading ? (
          <SkeletonTable rows={10} cols={6} />
        ) : (
          <>
            <Table
              users={data?.users || []}
              onRowClick={handleRowClick}
              onActionClick={handleActionClick}
              onFilterClick={handleFilterClick}
            />
            <Pagination
              page={page}
              limit={limit}
              total={totalUsers}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function UsersDashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <UsersDashboardContent />
    </Suspense>
  );
}
