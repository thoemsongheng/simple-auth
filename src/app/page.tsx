"use client";
import { logOut } from "@/libs/auth";

export default function Home() {
  const onLogOutClicked = async () => {
    return await logOut();
  };

  return (
    <main className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl text-teal-200">Welcome!</h1>
      <button
        onClick={onLogOutClicked}
        className="cursor-pointer rounded-full px-4 py-2 bg-teal-100 hover:bg-teal-50 text-gray-800"
      >
        Sign out
      </button>
    </main>
  );
}
