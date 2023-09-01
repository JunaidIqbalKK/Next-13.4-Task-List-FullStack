"use client";

import Link from "next/link";
import { useGlobalContext } from "@/app/context/store";
import { useEffect } from "react";

export default function page() {
  const { tasks, getTasks } = useGlobalContext();

  useEffect(() => {
    getTasks(tasks);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-28">
      <h1 className="text-4xl text-center mt-10 ">
        Task List App (Next-JS 13.4)
      </h1>

      <div className="flex justify-center gap-12 items-center mb-10 mt-10">
        <Link
          className="border border-green-400 text-slate-300 text-center px-2 py-1 w-28 rounded hover:bg-slate-700 hover:text-green-400"
          href="/dashboard/new-task"
        >
          New Task
        </Link>
        <Link
          className="border border-blue-400 text-slate-300 text-center px-2 py-1 w-28 rounded hover:bg-slate-700 hover:text-blue-400"
          href="/dashboard/show-tasks"
        >
          Show Tasks
        </Link>
      </div>
      <h1 className="text-xl text-center">
        You have {tasks.length} Tasks right now...
      </h1>
    </div>
  );
}
