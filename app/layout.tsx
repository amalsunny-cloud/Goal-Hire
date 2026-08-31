import "./globals.css"
import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google"; // 1. Import the font
import "./globals.css";

// 2. Configure the font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Add the font class or CSS variable to the HTML tag
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="mx-auto text-center">
        {children}
        <Toaster position="top-right"/>
        </div>
      </body>
    </html>
  );
}