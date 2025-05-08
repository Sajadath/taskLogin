import { register } from "@/lib/helperFunctions";
import { setCookie } from "cookies-next";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigation } from "../_hooks/useNavigation";

export default function CompleteSignUp({
  userInfo,
}: {
  userInfo: {
    phone: string;
    email: string | null;
  };
}) {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { navigateTo } = useNavigation();

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const formObject = {
      phone: userInfo.phone,
      email: formData.get("email")?.toString().trim() || null,
      password: formData.get("password")?.toString() || "",
      password_confirmation: formData.get("passwordConfirm")?.toString() || "",
    };

    if (
      formObject.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formObject.email)
    ) {
      setError("ایمیل را به درستی وارد کنید");
      setIsLoading(false);
      return;
    }

    if (formObject.password !== formObject.password_confirmation) {
      setError("تکرار رمزعبور به درستی وارد نشده");
      setIsLoading(false);
      return;
    }
    if (formObject.password!.length < 8) {
      setError("رمز عبور باید حداقل 8 کاراکتر باشد");
      setIsLoading(false);
      return;
    }

    const res = await register(formObject);
    if (res.errors) {
      setError(res.message);
      setIsLoading(false);
      return;
    }
    if (res.success) {
      setIsLoading(false);
      setError(null);
      setCookie("token", res.data, { maxAge: 10, path: "/" });
      navigateTo("/loggedIn");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmitForm} dir="ltr">
        <h2 className="text-center mb-9 max-w-[300px]">
          جهت تکمیل ثبت نام فرم زیر را پر کنید
        </h2>
        <div className=" flex  items-center justify-between gap-2">
          <label className="block" htmlFor="userPhone">
            شماره تماس :
          </label>
          <input
            required
            name="phone"
            id="userPhone"
            dir="ltr"
            type="text"
            disabled={true}
            value={userInfo.phone}
            className="border text-center py-1 cursor-not-allowed border-white  rounded  bg-gray-950  text-white"
          />
        </div>
        <div className=" flex mt-4  items-center justify-between gap-2">
          <label htmlFor="userEmail">ایمیل:</label>
          <input
            dir="ltr"
            type="email"
            name="email"
            defaultValue={userInfo.email ? userInfo.email : ""}
            id="userEmail"
            className="border text-center py-1 border-white rounded "
          />
        </div>

        <div className=" flex mt-4  items-center justify-between gap-2">
          <label htmlFor="password">رمزعبور:</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            className="border text-center py-1 border-white rounded "
            onKeyDown={(e) => {
              if (e.key === " ") e.preventDefault();
            }}
          />
        </div>
        <div className=" flex mt-4  items-center justify-between gap-2">
          <label htmlFor="passwordConfirm">تکرار رمزعبور:</label>
          <input
            required
            dir="ltr"
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            className="border text-center py-1 border-white rounded "
            onKeyDown={(e) => {
              if (e.key === " ") e.preventDefault();
            }}
          />
        </div>
        <h2
          dir="rtl"
          className=" pt-5 text-red-300 text-center max-w-[300px] wrap-break-word"
        >
          {error}
        </h2>
        {isLoading ? (
          <AiOutlineLoading className="h-9 w-9 mx-auto mt-4 animate-spin" />
        ) : (
          <button className="bg-white rounded w-full py-1 text-black mt-4 cursor-pointer hover:bg-black hover:text-white border border-white active:translate-y-1">
            تکمیل ثبت نام
          </button>
        )}
      </form>
    </div>
  );
}
