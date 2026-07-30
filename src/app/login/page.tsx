"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/uilib/Icons";
import Button from "@/components/uilib/Button";
import styles from "@/styles/auth/Login.module.scss";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("lendsqr_session_token");
      if (token) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Storage access failed:", err);
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("lendsqr_session_token", "mock_jwt_token_12345");
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <div className={styles.illustrationWrapper}>
          <svg width="450" height="350" viewBox="0 0 450 350" fill="none">
            <line x1="20" y1="290" x2="430" y2="290" stroke="#213F7D" strokeWidth="2" opacity="0.3" />
            <rect x="120" y="80" width="80" height="210" rx="4" stroke="#213F7D" strokeWidth="3" fill="none" />
            <circle cx="280" cy="110" r="25" fill="#39CDCC" />
            <rect x="255" y="160" width="50" height="50" rx="4" fill="#545F7D" opacity="0.8" />
            <polygon points="340,140 370,190 310,190" fill="#E4033B" opacity="0.7" />
            <circle cx="340" cy="225" r="30" fill="#E9B200" />

            <circle cx="80" cy="180" r="16" fill="#F3FCF6" />
            <path d="M70,180 Q80,165 90,180" stroke="#39CD62" strokeWidth="2" fill="none" />

            <path d="M110,150 Q115,160 120,150" stroke="#213F7D" strokeWidth="2" fill="none" />

            <rect x="130" y="140" width="30" height="70" rx="15" fill="#39CDCC" />
            <circle cx="145" cy="120" r="12" fill="#213F7D" opacity="0.2" />
            <path d="M140,210 L135,270 L155,270 L150,210" fill="#E9B200" />
            <rect x="135" y="210" width="20" height="50" fill="#213F7D" opacity="0.6" />
          </svg>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formBox}>
          <div className={styles.logoWrapper}>
            <Logo />
          </div>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>

          <form onSubmit={handleLogin}>
            {error && (
              <div
                style={{
                  color: "#E4033B",
                  backgroundColor: "rgba(228, 3, 59, 0.05)",
                  padding: "12px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  marginBottom: "20px",
                  fontWeight: 500,
                }}
              >
                {error}
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <div className="input-wrapper w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-action"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <Link href="#" className={styles.forgotPassword}>
              Forgot Password?
            </Link>

            <Button type="submit" size="lg" fullWidth disabled={isLoading}>
              {isLoading ? "Logging in..." : "LOG IN"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
