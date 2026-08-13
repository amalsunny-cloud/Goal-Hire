import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar/>
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}