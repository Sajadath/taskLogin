import { otpLoginFn, sendOtp } from "@/lib/helperFunctions";
import { useState, useRef, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigation } from "../_hooks/useNavigation";
import { setCookie } from "cookies-next";

function OtpLogin({ username }: { username: string }) {
  const [otpCode, setOtpCode] = useState<null | string>(null);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const { navigateTo } = useNavigation();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    async function sendOtpReq(username: string) {
      await sendOtp(username);
    }

    sendOtpReq(username);
  }, [username]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    setOtpCode(newOtp.join(""));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (paste.length) {
      const newOtp = paste.split("").concat(Array(6 - paste.length).fill(""));
      setOtp(newOtp);

      setOtpCode(newOtp.join(""));
      inputRefs.current[Math.min(paste.length, 5)]?.focus();
    }
  };

  async function handleOtpLogin() {
    setIsLoading(true);
    if (!username || !otpCode) return;
    const data = await otpLoginFn({ username: username, code: otpCode });

    if (data.errors) {
      setError("کدوارد شده درست نیست");
      setIsLoading(false);
    } else {
      setError(null);
      setIsLoading(false);
      setCookie("token", data.data, { maxAge: 60 * 10, path: "/" });
      navigateTo("/loggedIn");
    }
  }

  const isButtonDisabled = !otp.every((digit) => digit !== "");

  return (
    <>
      <h2 className="my-3">رمز عبور یکبار مصرف ارسال شده را وارد کنید</h2>
      <div className="flex flex-row justify-center gap-2" dir="ltr">
        {otp.map((digit, index) => (
          <input
            required
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className="w-10 h-10 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        ))}
      </div>
      {error && (
        <h2 className="text-red-300 text-xs text-center mt-4">{error}</h2>
      )}
      {isLoading ? (
        <AiOutlineLoading className=" h-10 w-10  mx-auto mt-4 animate-spin" />
      ) : (
        <button
          onClick={handleOtpLogin}
          disabled={isButtonDisabled}
          className={`w-full border border-white py-2 mt-4 rounded cursor-pointer bg-white text-black transition-all duration-300 active:translate-y-1 hover:bg-black hover:text-white disabled:opacity-50  disabled:cursor-not-allowed `}
        >
          ورود با رمز یکبارمصرف
        </button>
      )}
    </>
  );
}

export default OtpLogin;
