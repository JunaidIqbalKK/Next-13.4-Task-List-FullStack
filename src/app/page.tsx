"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl text-center mt-10">
        Task List App (Next-JS 13.4)
      </h1>
      <div className="flex justify-center gap-12 items-center mb-10 mt-10">
        <Link
          className="border border-blue-500 text-slate-300 text-center px-2 py-1 w-24 rounded hover:bg-slate-700 hover:text-blue-500"
          href="/login"
        >
          Login
        </Link>
        <Link
          className="border border-green-500 text-slate-300 text-center px-2 py-1 w-24 rounded hover:bg-slate-700 hover:text-green-500"
          href="/register"
        >
          Register
        </Link>
      </div>
      <h1 className="text-xl text-center">
        You have to
        <Link
          className="text-blue-400 text-center px-2 py-1 w-24 hover:text-slate-400"
          href="/login"
        >
          Login
        </Link>
        or
        <Link
          className="text-green-400 text-center px-2 py-1 w-24 hover:text-slate-400"
          href="/register"
        >
          Register
        </Link>
        to use this Task-List Application
      </h1>
    </div>
  );
}
