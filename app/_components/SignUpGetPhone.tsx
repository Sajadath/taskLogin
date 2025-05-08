import React, { useRef, useState } from "react";
import OtpSignUp from "./OtpSignUp";

export default function SignUpGetPhone({
  email,
  setShowSignUpForm,
}: {
  email: string;
  setShowSignUpForm: (a: {
    data: {
      email: null | string;
      phone: null | string;
    };
    show: boolean;
  }) => void;
}) {
  const [error, setError] = useState<null | string>(null);
  const [goToOtp, setGoToOtp] = useState(false);
  const phoneRef = useRef<null | HTMLInputElement>(null);
  function handleClickButton() {
    const phoneValue = phoneRef.current!.value;
    if (phoneValue.length < 11 || !phoneValue.startsWith("09")) {
      setError("لطفا شماره تماس خود را درست وارد کنید");
    } else {
      setError(null);
      setGoToOtp(true);
    }
  }

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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (!/^[0-9]*$/.test(pasteData)) {
      e.preventDefault();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="w-fit px-4"
    >
      {!goToOtp ? (
        <>
          <div className="flex flex-col gap-1">
            <h2 className="max-w-[300px] wrap-break-word text-center mb-4">
              جهت ثبت نام شماره تماس خود را وارد کنید
            </h2>
            <label htmlFor="phone">شماره تماس :</label>
            <input
              ref={phoneRef}
              dir="ltr"
              id="phone"
              className="border border-white rounded pl-2 py-1"
              type="tel"
              placeholder="09 ----------"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={11}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
            />
            {error && (
              <h2 className="text-red-300 text-sm text-center">{error}</h2>
            )}
          </div>
          <button
            onClick={handleClickButton}
            className="bg-white text-black cursor-pointer rounded w-full mt-4 py-1 border border-white hover:bg-black hover:text-white active:translate-y-1"
          >
            دریافت کد
          </button>
        </>
      ) : (
        <OtpSignUp
          setShowSignUpForm={setShowSignUpForm}
          phone={phoneRef.current!.value}
          email={email}
        />
      )}
    </form>
  );
}
