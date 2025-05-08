import React, { useRef, useState } from "react";
import OtpLogin from "./OtpLogin";
import { passwordLoginFn } from "@/lib/helperFunctions";
import { setCookie } from "cookies-next/client";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigation } from "../_hooks/useNavigation";

export default function LoginViaPassword({ username }: { username: string }) {
  const [method, setMethod] = useState<"password" | "otp">("password");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { navigateTo } = useNavigation();
  const passwordRef = useRef<null | HTMLInputElement>(null);
  async function handleLoginViaPassword() {
    if (!passwordRef.current!.value.trim()) return;

    setIsLoading(true);
    const res = await passwordLoginFn({
      username: username,
      password: passwordRef.current!.value,
    });
    if (res.success) {
      setError(null);
      setCookie("token", res.data, { maxAge: 60 * 10, path: "/" });
      setIsLoading(false);
      navigateTo("/loggedIn");
    } else {
      setError("رمز عبور را به درستی وارد کنید");
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {method === "password" ? (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">رمزعبور خود را وارد کنید:</label>
            <input
              ref={passwordRef}
              dir="ltr"
              className="border px-2 py-1 border-white rounded"
              id="password"
              type="password"
              placeholder="password"
            />
          </div>
          {error && (
            <h2 className="text-center text-red-300 text-xs mt-4">{error} </h2>
          )}
          {isLoading ? (
            <AiOutlineLoading className="h-10 w-10 animate-spin mx-auto mt-4" />
          ) : (
            <button
              onClick={handleLoginViaPassword}
              className="w-full border border-white py-2 mt-4 rounded cursor-pointer bg-white text-black hover:bg-black hover:text-white transition-all duration-300 active:translate-y-1"
            >
              ورود با رمزعبور
            </button>
          )}
        </>
      ) : (
        <OtpLogin username={username} />
      )}

      <button
        onClick={() => {
          if (method === "password") {
            setMethod("otp");
          } else {
            setMethod("password");
          }
        }}
        className=" py-1 mt-4 cursor-pointer"
      >
        {method === "password"
          ? "ورود با رمز یکبار مصرف"
          : "ورود با رمزعبور دائمی"}
      </button>
    </form>
  );
}
