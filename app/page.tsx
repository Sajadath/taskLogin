import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="bg-black w-full h-dvh text-white flex items-center justify-center">
      <Link
        href="/login"
        className="px-10 py-2 border-2 border-white rounded hover:bg-white hover:text-black transition-all duration-300 active:scale-x-125"
      >
        ورود
      </Link>
    </div>
  );
}
