import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function PlatformLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Header />
          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
