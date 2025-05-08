"use client";
import React from "react";
import { deleteCookie } from "cookies-next";
import { useNavigation } from "../_hooks/useNavigation";

export default function Page() {
  const { navigateTo } = useNavigation();
  function handleClick() {
    deleteCookie("token");
    navigateTo("/login");
  }
  return (
    <div className="bg-black text-white content-center text-center min-h-dvh w-dvw">
      <button
        onClick={handleClick}
        className="px-6 py-3 text-lg font-bold uppercase text-red-500 bg-transparent border-2 border-red-500 rounded-lg shadow-[0_0_10px_rgba(239,68,68,0.7)] hover:shadow-[0_0_20px_rgba(239,68,68,1)] hover:bg-red-500/10 transition-all duration-300 cursor-pointer active:translate-y-1"
      >
        Log Out !
      </button>
      <h1 className="mt-10">Sensetive Data</h1>
    </div>
  );
}
