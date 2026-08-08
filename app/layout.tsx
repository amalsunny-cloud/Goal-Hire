import Navbar from "@/components/layout/Navbar";
import "./globals.css"
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <div className="mx-auto text-center">
          {children}

          <Toaster position="top-right"/>
        </div>
        <Footer/>
      </body>
    </html>
  );
}