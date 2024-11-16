import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A simple task manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>
        <header className="bg-gray-800 text-white p-4 h-20">
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-200 p-4 text-center">
          <p>&copy; 2023 Task Manager. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
