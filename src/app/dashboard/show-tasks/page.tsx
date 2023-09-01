"use client";

import Link from "next/link";
import TaskItem from "@/app/dashboard/components/TaskItem";
import { useGlobalContext } from "@/app/context/store";
import { useEffect } from "react";

export default function page() {
  const { tasks, getTasks } = useGlobalContext();

  useEffect(() => {
    getTasks(tasks);
  }, [tasks]);

  return (
    <div className="mt-14">
      <header className="flex justify-between items-center mb-10 mt-10">
        <Link
          className="text-4xl cursor-pointer hover:text-slate-300"
          href="/dashboard"
        >
          Task List
        </Link>
        <Link
          className="border border-green-400 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 hover:text-green-400"
          href="/dashboard/new-task"
        >
          New Task
        </Link>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-slate-600 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <TaskItem {...task} />
          </div>
        ))}
      </div>
    </div>
  );
}
