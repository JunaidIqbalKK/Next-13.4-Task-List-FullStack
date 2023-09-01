"use client";

import Link from "next/link";
import { useGlobalContext } from "@/app/context/store";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userInfo, user, logOut } = useGlobalContext();

  useEffect(() => {
    userInfo(null);
  }, []);

  return (
    <section>
      <nav className="py-6 flex justify-between">
        <Link href={"/dashboard"} className="text-2xl">
          Task List App (Next JS 13.4)
        </Link>
        <div className="flex items-center">
          <h4 className="mx-4">Logged in as {user.username}</h4>
          <button
            className="border border-slate-300 text-red-500 text-center w-24 px-2 py-1 rounded hover:bg-slate-700"
            onClick={() => {
              logOut(null);
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {children}
    </section>
  );
}
