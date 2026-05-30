import Navbar from "@/components/layout/Navbar";
import "./globals.css"
import Footer from "@/components/layout/Footer";

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar/>
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}