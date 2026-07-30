import React from "react";
import { FilterIcon, DownloadIcon } from "../uilib/Icons";
import styles from "../../styles/dashboard/TableControls.module.scss";

interface TableControlsProps {
  onFilterToggle: () => void;
  onDownloadCSV: () => void;
}

export default function TableControls({ onFilterToggle, onDownloadCSV }: TableControlsProps) {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.btn} onClick={onFilterToggle}>
        <FilterIcon size={14} />
        <span>Filter</span>
      </button>
      <button type="button" className={styles.btn} onClick={onDownloadCSV}>
        <DownloadIcon size={14} />
        <span>Download as CSV</span>
      </button>
    </div>
  );
}
