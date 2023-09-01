"use client";

import Link from "next/link";
import { useGlobalContext } from "@/app/context/store";

export default function page() {
  const { task, setTask, error, editTask } = useGlobalContext();

  return (
    <div className="mt-28">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Edit Task</h1>
      </header>
      <div className="flex gap-2 flex-col">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={(e) => {
            setTask({ ...task, title: e.target.value });
          }}
          className="border border-slate-300 bg-transparent rounded px-2 py-3
        outline-none focus-within:border-slate-100"
        />
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={(e) => {
            setTask({ ...task, description: e.target.value });
          }}
          className="border border-slate-300 bg-transparent rounded px-2 py-6
        outline-none focus-within:border-slate-100"
        />
        {error ? (
          <p className="text-red-500 text-xs mt-2">*** {error} ***</p>
        ) : (
          ""
        )}
        <div className="flex gap-1 justify-end">
          <Link
            href="/dashboard/show-tasks"
            className="border border-red-400 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 hover:text-red-400"
          >
            Cancel
          </Link>
          <button
            onClick={() => {
              editTask(task);
            }}
            className="border border-blue-400 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 hover:text-blue-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
