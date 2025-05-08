import React from "react";

interface LoginButtonProps {
  buttonfor: string;
  method: string;
  setMethod: (a: string) => void;
  children: React.ReactNode;
}

export default function LoginButton({
  buttonfor,
  method,
  setMethod,
  children,
}: LoginButtonProps) {
  const disableButton =
    (buttonfor === "phone" && method === "phone") ||
    (buttonfor === "email" && method === "email");

  return (
    <button
      disabled={disableButton}
      onClick={() => {
        setMethod(buttonfor);
      }}
      className="cursor-pointer disabled:cursor-not-allowed relative"
    >
      <div
        className={`${
          (buttonfor === "phone" && method === "phone") ||
          (buttonfor === "email" && method === "email")
            ? " scale-x-100"
            : "scale-x-0"
        } transition-all duration-500 h-[0.5px] bg-white absolute top-full left-0 right-0`}
      ></div>
      {children}
    </button>
  );
}
