"use client";

import { logIn } from "@/libs/auth";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState<{ email?: string; password?: string }>({});

  const onSubmit = async () => {
    if (!form.email || !form?.password) return;

    return await logIn(form.email, form?.password);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <section className="border bg-gray-700/10 p-4 rounded-md flex flex-col gap-6">
        <h2 className="text-xl font-bold">Login</h2>

        <div className="flex flex-col gap-2">
          <input
            className="border p-2 rounded-md outline-offset-1 focus:outline-teal-400"
            type="text"
            value={String(form?.email ?? "")}
            placeholder="Email"
            onChange={(e) => {
              const value = e.currentTarget.value.toString().trim();
              setForm({ ...form, email: value });
            }}
          />

          <input
            className="border p-2 rounded-md outline-offset-1 focus:outline-teal-400"
            type="text"
            value={String(form?.password ?? "")}
            placeholder="Password"
            onChange={(e) => {
              const value = e.currentTarget.value.toString().trim();
              setForm({ ...form, password: value });
            }}
          />
        </div>
        <button
          className="bg-teal-300 hover:bg-teal-200 text-gray-800 py-2 rounded-md w-full px-4 cursor-pointer"
          onClick={onSubmit}
        >
          Login
        </button>
      </section>
    </div>
  );
}
