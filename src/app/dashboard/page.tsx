"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, fetchUserStats } from "@/services/api";
import { SkeletonTable } from "@/components/uilib/Skeleton";
import Table from "@/components/dashboard/Table";
import Pagination from "@/components/dashboard/Pagination";
import MobileRowDrawer from "@/components/dashboard/MobileRowDrawer";
import TableControls from "@/components/dashboard/TableControls";
import FilterDrawer from "@/components/dashboard/FilterDrawer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { downloadUsersCSV } from "@/utils/csv";
import styles from "@/styles/dashboard/Users.module.scss";





function UsersDashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [selectedDrawerUser, setSelectedDrawerUser] = useState<any | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);


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

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchUserStats,
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
    if (window.innerWidth <= 768) {
      setSelectedDrawerUser(user);
      setIsMobileDrawerOpen(true);
    } else {
      router.push(`/dashboard/users/${user.id}`);
    }
  };

  const handleStatusChange = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleDownloadCSV = () => {
    if (data?.users) {
      downloadUsersCSV(data.users);
    }
  };


  const handleFilterApply = (filters: Record<string, string>) => {
    updateUrlParams({
      ...filters,
      page: 1,
    });
  };

  const handleFilterReset = () => {
    updateUrlParams({
      orgName: null,
      userName: null,
      email: null,
      phoneNumber: null,
      status: null,
      date: null,
      page: 1,
    });
  };

  const handleBlacklistMobile = () => {
    if (selectedDrawerUser) {
      localStorage.setItem(`lendsqr_user_status_${selectedDrawerUser.id}`, "blacklisted");
      handleStatusChange();
    }
  };

  const handleActivateMobile = () => {
    if (selectedDrawerUser) {
      localStorage.setItem(`lendsqr_user_status_${selectedDrawerUser.id}`, "active");
      handleStatusChange();
    }
  };

  const totalUsers = data?.total || 0;

  return (
    <div className={styles.pageContainer}>
      <DashboardHeader stats={stats} totalUsers={totalUsers} />


      <TableControls
        onFilterToggle={() => setIsFilterOpen(true)}
        onDownloadCSV={handleDownloadCSV}
      />

      <div className={styles.tableSection}>
        {isLoading ? (
          <SkeletonTable rows={10} cols={6} />
        ) : (
          <>
            <Table
              users={data?.users || []}
              onRowClick={handleRowClick}
              onStatusChange={handleStatusChange}
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

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilter={(filters) => {
          handleFilterApply(filters);
        }}
        onReset={() => {
          handleFilterReset();
        }}
      />


      {selectedDrawerUser && (
        <MobileRowDrawer
          user={selectedDrawerUser}
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          onBlacklist={handleBlacklistMobile}
          onActivate={handleActivateMobile}
        />
      )}
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
