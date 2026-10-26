
import "./globals.css";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="mx-auto text-center">
          {children}
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}
