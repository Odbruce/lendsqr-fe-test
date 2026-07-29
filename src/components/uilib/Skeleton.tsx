import React from "react";
import styles from "../../styles/uilib/Skeleton.module.scss";

interface SkeletonProps {
  width?: string;
  height?: string;
  circle?: boolean;
  className?: string;
}

export function Skeleton({
  width = "100%",
  height = "16px",
  circle = false,
  className = "",
}: SkeletonProps) {
  const skeletonClass = `${styles.skeleton} ${circle ? styles.circle : ""} ${className}`;
  return <span className={skeletonClass} style={{ width, height }} />;
}

export function SkeletonCircle({ size = "40px", className = "" }: { size?: string; className?: string }) {
  return <Skeleton width={size} height={size} circle className={className} />;
}

export function SkeletonText({ width = "100%", className = "" }: { width?: string; className?: string }) {
  return <Skeleton width={width} height="12px" className={`${styles.text} ${className}`} />;
}

interface SkeletonTableProps {
  rows?: number;
  cols?: number;
}

export function SkeletonTable({ rows = 6, cols = 6 }: SkeletonTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i} className={styles.th}>
              <Skeleton width="80px" height="14px" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex} className={styles.tr}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <td key={colIndex} className={styles.td}>
                {colIndex === cols - 1 ? (
                  <Skeleton width="40px" height="24px" />
                ) : (
                  <SkeletonText width={colIndex % 2 === 0 ? "75%" : "90%"} />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
