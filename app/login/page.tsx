"use client";

import { useState } from "react";
import LoginForm from "../_components/LoginForm";
import LoginViaPassword from "../_components/LoginViaPassword";
import SignUpGetPhone from "../_components/SignUpGetPhone";
import OtpSignUp from "../_components/OtpSignUp";
import CompleteSignUp from "../_components/CompleteSignUp";

export default function Page() {
  const [userExists, SetUserExists] = useState<{
    status: "unchecked" | "exists" | "notExists";
    username: string | null;
    method: null | "phone" | "email";
  }>({
    status: "unchecked",
    username: null,
    method: null,
  });

  const [showSignUpForm, setShowSignUpForm] = useState<{
    data: {
      phone: string | null;
      email: string | null;
    };
    show: boolean;
  }>({
    data: {
      phone: null,
      email: null,
    },
    show: false,
  });

  return (
    <div
      dir="rtl"
      className="flex min-h-dvh w-full items-center justify-center bg-black text-white"
    >
      <div className="border-[0.5px] border-white/20 rounded px-5 py-5">
        {!showSignUpForm.show ? (
          <>
            {userExists.status === "unchecked" && (
              <>
                <h1 className="mt-3 mb-3 text-center">خوش آمدید</h1>

                <LoginForm SetUserExists={SetUserExists} />
              </>
            )}
            {userExists.status === "exists" && (
              <LoginViaPassword username={userExists.username!} />
            )}
            {userExists.status === "notExists" &&
            userExists.method === "email" ? (
              <SignUpGetPhone
                setShowSignUpForm={setShowSignUpForm}
                email={userExists.username!}
              />
            ) : null}
            {userExists.status === "notExists" &&
            userExists.method === "phone" ? (
              <OtpSignUp
                setShowSignUpForm={setShowSignUpForm}
                phone={userExists.username!}
              />
            ) : null}
          </>
        ) : (
          <CompleteSignUp
            userInfo={{
              phone: showSignUpForm.data.phone!,
              email: showSignUpForm.data.email,
            }}
          />
        )}
      </div>
    </div>
  );
}
