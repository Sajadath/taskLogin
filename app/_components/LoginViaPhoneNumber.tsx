import React from "react";

interface LoginViaPhoneNumberProps {
  method: string;
  phoneRef: React.RefObject<HTMLInputElement | null>;
}

export default function LoginViaPhoneNumber({
  method,
  phoneRef,
}: LoginViaPhoneNumberProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "F12",
      "v",
    ];

    if (
      e.ctrlKey &&
      (e.key === "a" || e.key === "A" || e.key === "v" || e.key === "V")
    ) {
      return;
    }
    if (!allowedKeys.includes(e.key) && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={`${method === "phone" ? "flex flex-col" : "hidden"} `}>
      <label htmlFor="phoneNumber">شماره تماس :</label>
      <input
        dir="ltr"
        ref={phoneRef}
        className="border border-white rounded pl-2 py-1"
        type="tel"
        id="phoneNumber"
        placeholder="09 ----------"
        onKeyDown={handleKeyDown}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={11}
      />
    </div>
  );
}
