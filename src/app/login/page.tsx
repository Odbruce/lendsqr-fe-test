

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
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.videoPlayer}

          >
            <source src="/landingVid.MP4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
