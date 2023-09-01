"use client";

import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function handleLogin() {
    if (!user.email) {
      setError("email can not be empty...!!!");
      return;
    }

    if (!user.password) {
      setError("password can not be empty...!!!");
      return;
    }

    try {
      const axiosResponse: AxiosResponse<any> = await axios.post(
        "/api/user/login",
        user,
        { headers: { "Content-Type": "application/json" } }
      );
      const response = axiosResponse.data;
      console.log(response);

      setUser({
        email: "",
        password: "",
      });

      setError("");

      router.push("/dashboard");
    } catch (err) {
      let message = (err as any).response.data.error;
      setError(message as string);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl">Log In</h1>
      <br />
      <div className="flex">
        <div className="flex flex-col">
          <label className="p-1 m-2" htmlFor="email">
            Email:
          </label>
          <label className="p-1 m-2" htmlFor="password">
            Password:
          </label>
        </div>
        <div className="flex flex-col w-96">
          <input
            className="text-black p-1 m-2 rounded"
            type="text"
            name="email"
            id="email"
            placeholder="email address"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <input
            className="text-black p-1 m-2 rounded"
            type="password"
            name="password"
            id="passowrd"
            placeholder="passowrd"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
      </div>
      {error ? (
        <p className="text-red-500 text-xs mt-2">*** {error} ***</p>
      ) : (
        ""
      )}
      <div className="flex mt-10">
        <button
          className="w-40 p-1 m-2 border border-slate-300 rounded hover:bg-slate-700 hover:text-red-500"
          onClick={() => {
            router.push("/");
          }}
        >
          Cancel
        </button>
        <button
          className="w-40 p-1 m-2 border border-slate-300 rounded hover:bg-slate-700 hover:text-blue-500"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <h1 className="text-lg text-center m-3">
        Don't have an account?
        <Link
          className="text-slate-300 text-center px-2 py-1 w-24 hover:text-blue-500"
          href="/register"
        >
          Register here!
        </Link>
      </h1>
    </div>
  );
}
