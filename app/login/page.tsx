"use client";

import { useState } from "react";
import LoginForm from "../_components/LoginForm";
import LoginViaPassword from "../_components/LoginViaPassword";

export default function Page() {
  const [userExists, SetUserExists] = useState<{
    status: "unchecked" | "exists" | "notExists";
    username: string | null;
  }>({
    status: "unchecked",
    username: null,
  });
  return (
    <div
      dir="rtl"
      className="flex min-h-dvh w-full items-center justify-center bg-black text-white"
    >
      <div className="border-[0.5px] border-white/20 rounded px-5 py-5">
        {userExists.status === "unchecked" && (
          <>
            <h1 className="mt-3 mb-3 text-center">خوش آمدید</h1>

            <LoginForm SetUserExists={SetUserExists} />
          </>
        )}
        {userExists.status === "exists" && (
          <LoginViaPassword username={userExists.username!} />
        )}
        {userExists.status === "notExists" && <p>not exists</p>}
      </div>
    </div>
  );
}
