import React, { useRef, useState } from "react";
import LoginViaPhoneNumber from "./LoginViaPhoneNumber";
import LoginViaEmail from "./LoginViaEmail";
import LoginButton from "./LoginButton";
import { checkExists } from "@/lib/helperFunctions";
import { AiOutlineLoading } from "react-icons/ai";

export default function LoginForm({
  SetUserExists,
}: {
  SetUserExists: (a: {
    status: "unchecked" | "notExists" | "exists";
    username: string | null;
    method: null | "phone" | "email";
  }) => void;
}) {
  const [method, setMethod] = useState("phone");
  const [phoneError, setPhoneError] = useState<null | string>(null);
  const [emailError, setemailError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmitForm() {
    if (method === "phone") {
      const phoneValue = phoneRef.current!.value;
      if (phoneValue.length < 11 || !phoneValue.startsWith("09")) {
        setPhoneError("لطفا شماره تماس خود را درست وارد کنید");
      } else {
        setPhoneError(null);
        setIsLoading(true);
        const data = await checkExists(phoneValue);
        setIsLoading(false);
        if (data.success && data.data.exists) {
          SetUserExists({
            status: "exists",
            username: phoneValue,
            method: "phone",
          });
        } else {
          SetUserExists({
            status: "notExists",
            username: phoneValue,
            method: "phone",
          });
        }
      }
    } else {
      const emailValue = emailRef.current!.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailValue.length < 5 || !emailRegex.test(emailValue)) {
        setemailError("لطفا ایمیل خود را درست وارد کنید");
      } else {
        setemailError(null);
        setPhoneError(null);
        setIsLoading(true);
        const data = await checkExists(emailValue);
        setIsLoading(false);
        if (data.success && data.data.exists) {
          SetUserExists({
            status: "exists",
            username: emailValue,
            method: "email",
          });
        } else {
          SetUserExists({
            status: "notExists",
            username: emailValue,
            method: "email",
          });
        }
      }
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex gap-10 mb-8">
        <LoginButton method={method} setMethod={setMethod} buttonfor="phone">
          ورود با شماره تلفن
        </LoginButton>
        <LoginButton method={method} setMethod={setMethod} buttonfor="email">
          ورود باایمیل
        </LoginButton>
      </div>

      <LoginViaPhoneNumber method={method} phoneRef={phoneRef} />

      <LoginViaEmail method={method} emailRef={emailRef} />

      {method === "phone" && phoneError && (
        <p className="pt-3 text-center text-xs text-red-300"> {phoneError}</p>
      )}
      {method === "email" && emailError && (
        <p className="pt-3 text-center text-xs text-red-300"> {emailError}</p>
      )}
      {isLoading ? (
        <AiOutlineLoading className="mx-auto mt-4 h-6 w-6 animate-spin" />
      ) : (
        <button
          className="mx-auto border border-white w-full py-1 mt-4 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-300 active:translate-y-1 "
          onClick={handleSubmitForm}
        >
          ورود
        </button>
      )}
    </form>
  );
}
