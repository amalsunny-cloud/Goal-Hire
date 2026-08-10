import "./globals.css"
import { Toaster } from "react-hot-toast";

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto text-center">
          {children}
          <Toaster position="top-right"/>
        </div>
      </body>
    </html>
  );
}