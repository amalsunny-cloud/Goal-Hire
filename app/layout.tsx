import Navbar from "@/components/layout/Navbar";
import "./globals.css"
import Footer from "@/components/layout/Footer";

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar/>
        <div className="max-w-6xl mx-auto min-h-screen text-center">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}