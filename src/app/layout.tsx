import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "../styles/globals.scss";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lendsqr Admin Portal",
  description: "Lendsqr back-office administration panel for managing users and organization operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
