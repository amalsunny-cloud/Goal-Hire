import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Navbar2 from "@/components/layout/Navbar2";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar2/>
      <main className="flex-1 bg-blue-300/10">{children}</main>
      <Footer />
    </div>
  );
}