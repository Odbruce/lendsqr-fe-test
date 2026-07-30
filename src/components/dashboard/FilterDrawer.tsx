import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Drawer from "../uilib/Drawer";
import Button from "../uilib/Button";
import styles from "../../styles/dashboard/FilterDrawer.module.scss";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: Record<string, string>) => void;
  onReset: () => void;
}

export default function FilterDrawer({ isOpen, onClose, onFilter, onReset }: FilterDrawerProps) {
  const searchParams = useSearchParams();

  const [orgName, setOrgName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOrgName(searchParams.get("orgName") || "");
      setUserName(searchParams.get("userName") || "");
      setEmail(searchParams.get("email") || "");
      setPhoneNumber(searchParams.get("phoneNumber") || "");
      setStatus(searchParams.get("status") || "");
      setDate(searchParams.get("date") || "");
    }
  }, [searchParams, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      orgName,
      userName,
      email,
      phoneNumber,
      status,
      date,
    });
    onClose();
  };

  const handleResetClick = () => {
    setOrgName("");
    setUserName("");
    setEmail("");
    setPhoneNumber("");
    setStatus("");
    setDate("");
    onReset();
    onClose();
  };

  const organizations = ["Lendsqr", "Irorun", "Lendstar", "Carbon", "Venture Garden"];
  const statuses = ["Active", "Inactive", "Pending", "Blacklisted"];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right">
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h2>Filter Users</h2>
        </div>

        <div className={styles.fieldsScroll}>
          <div className="form-group">
            <label>Organization</label>
            <select value={orgName} onChange={(e) => setOrgName(e.target.value)}>
              <option value="">Select</option>
              {organizations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="User"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select</option>
              {statuses.map((st) => (
                <option key={st} value={st.toLowerCase()}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.footerActions}>
          <Button type="button" variant="primaryOutline" size="md" fullWidth onClick={handleResetClick}>
            Reset
          </Button>
          <Button type="submit" variant="primary" size="md" fullWidth>
            Filter
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
