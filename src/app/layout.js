import NavbarPage from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import FooterPage from "@/components/Footer";
import Providers from "@/lib/Providers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProTech Computer Solutions",
  description:
    "ProTech Computer Solutions is Computer Repair and It service provider",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div className="mb-24">
            <NavbarPage />
          </div>
          {children}
          <FooterPage />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </body>
      </html>
    </Providers>
  );
}
