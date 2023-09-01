"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

type DataType = {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

interface ContextProps {
  tasks: DataType[];
  setTasks: Dispatch<SetStateAction<DataType[]>>;
  task: any;
  setTask: Dispatch<SetStateAction<any>>;
  error: any;
  setError: Dispatch<SetStateAction<any>>;
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  userInfo: Dispatch<SetStateAction<any>>;
  logOut: Dispatch<SetStateAction<any>>;
  getTasks: Dispatch<SetStateAction<DataType[]>>;
  createTask: Dispatch<SetStateAction<any>>;
  deleteTask: Dispatch<SetStateAction<any>>;
  toggleTask: Dispatch<SetStateAction<any>>;
  editTask: Dispatch<SetStateAction<any>>;
}

const GlobalContext = createContext<ContextProps>({
  tasks: [],
  setTasks: (): DataType[] => [],
  task: {},
  setTask: (): any => {},
  error: "",
  setError: (): any => "",
  user: {},
  setUser: (): any => {},
  userInfo: (): any => {},
  logOut: (): any => {},
  getTasks: (): DataType[] => [],
  createTask: (): any => {},
  deleteTask: (): any => {},
  toggleTask: (): any => {},
  editTask: (): any => {},
});

export const GlobalContextProvider = ({ children }) => {
  const router = useRouter();
  const [tasks, setTasks] = useState<[] | DataType[]>([]);
  const [task, setTask] = useState<{} | any>({});
  const [error, setError] = useState<"" | any>("");
  const [user, setUser] = useState<{} | any>({});

  async function userInfo() {
    try {
      const axiosResponse: AxiosResponse<any> = await axios.get(
        "/api/user/info",
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseData = axiosResponse.data.data;
      setUser(responseData);
      return responseData;
    } catch (error) {
      console.error(error);
    }
  }

  async function logOut() {
    try {
      await axios.post("/api/user/logout", {
        headers: { "Content-Type": "application/json" },
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  async function getTasks() {
    try {
      const axiosResponse: AxiosResponse<any> = await axios.get(
        "/api/task/get-tasks",
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseData = axiosResponse.data.tasks;
      setTasks(responseData);
      return responseData as DataType;
    } catch (error) {
      console.error(error);
    }
  }

  async function createTask(data: any) {
    if (!data.title) {
      setError("title can not be empty...!!!");
      return;
    }

    if (!data.description) {
      setError("description can not be empty...!!!");
      return;
    }
    try {
      await axios.post("/api/task/add-task", data, {
        headers: { "Content-Type": "application/json" },
      });

      setError("");

      router.push("/dashboard/show-tasks");
    } catch (error) {
      let message = (error as any).response.data.error;
      setError(message as string);
    }
  }

  async function deleteTask(id: string) {
    try {
      const axiosResponse: AxiosResponse<any> = await axios.post(
        "/api/task/delete-task",
        id,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseData = axiosResponse.data.message;
      router.push("/dashboard/show-tasks");
      return responseData;
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleTask(data: any) {
    try {
      const axiosResponse: AxiosResponse<any> = await axios.post(
        "/api/task/update-task",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseData = axiosResponse.data.message;
      router.push("/dashboard/show-tasks");
      return responseData;
    } catch (error) {
      console.error(error);
    }
  }

  async function editTask() {
    if (!task.title) {
      setError("title can not be empty...!!!");
      return;
    }

    if (!task.description) {
      setError("description can not be empty...!!!");
      return;
    }
    try {
      await axios.post("/api/task/edit-task", task, {
        headers: { "Content-Type": "application/json" },
      });

      setTask({
        id: "",
        title: "",
        description: "",
      });
      setError("");
      router.push("/dashboard/show-tasks");
    } catch (error) {
      let message = (error as any).response.data.error;
      setError(message as string);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        setTasks,
        task,
        setTask,
        error,
        setError,
        user,
        setUser,
        userInfo,
        logOut,
        getTasks,
        createTask,
        deleteTask,
        toggleTask,
        editTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
