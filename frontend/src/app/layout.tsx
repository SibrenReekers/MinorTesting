import "./globals.css";
import Navbar from "./components/Navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-white text-black">
      <Navbar />
      <div className="flex-grow p-6 md:p-5 overflow-auto pt-16">{children}</div>
    </div>
  );
}