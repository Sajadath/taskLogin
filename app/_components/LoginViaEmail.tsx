import React from "react";

interface LoginViaEmailProps {
  method: string;
  emailRef: React.RefObject<HTMLInputElement | null>;
}

export default function LoginViaEmail({
  method,
  emailRef,
}: LoginViaEmailProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <div className={`${method === "email" ? "flex flex-col" : "hidden"} `}>
      <label htmlFor="email">ایمیل :</label>
      <input
        dir="ltr"
        ref={emailRef}
        className="border border-white rounded pl-2 py-1"
        type="email"
        id="email"
        placeholder="example@gmail.com"
        maxLength={54}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
