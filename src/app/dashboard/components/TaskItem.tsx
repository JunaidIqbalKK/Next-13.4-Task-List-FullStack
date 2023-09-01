"use client";

import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context/store";

type TaskProps = {
  id: string;
  title: string;
  description: string;
  complete: boolean;
};

export default function TaskItem({
  id,
  title,
  description,
  complete,
}: TaskProps) {
  const { setTask, deleteTask, toggleTask } = useGlobalContext();

  const router = useRouter();

  function setEdit() {
    setTask({ id: id, title: title, description: description });
    router.push("/dashboard/edit-task");
  }

  return (
    <div>
      <div className="flex gap-1 items-center">
        <input
          id={id}
          type="checkbox"
          className="cursor-pointer peer"
          defaultChecked={complete}
          onChange={(e) => {
            const data = { id: id, complete: e.target.checked };
            toggleTask(data);
          }}
        />
        <label
          htmlFor={id}
          className="cursor-pointer text-lg peer-checked:line-through peer-checked:text-slate-400"
        >
          {title}
        </label>
      </div>
      <label htmlFor={id} className="text-slate-400 text-sm ml-5">
        {description}
      </label>
      <div className="flex gap-1 justify-end text-center mt-5">
        <button
          className="border border-slate-300 text-red-400 px-2 py-1 rounded hover:bg-slate-700 outline-none"
          onClick={() => {
            deleteTask(id);
          }}
        >
          Delete
        </button>
        <button
          className="border border-slate-300 text-blue-400 px-2 py-1 rounded hover:bg-slate-700 outline-none"
          onClick={() => {
            setEdit();
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
