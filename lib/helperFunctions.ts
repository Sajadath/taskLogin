const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EXIST_SEGMENT = process.env.NEXT_PUBLIC_EXIST_SEGMENT;

const LOGIN_VIA_PASSWORD = process.env.NEXT_PUBLIC_LOGIN_VIA_PASSWORD;

const SEND_OTP = process.env.NEXT_PUBLIC_SEND_OTP;
const LOGIN_VIA_OTP = process.env.NEXT_PUBLIC_LOGIN_VIA_OTP;

export async function checkExists(input: string) {
  const bodyData = { username: input };
  try {
    const res = await fetch(`${BASE_URL}${EXIST_SEGMENT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(
      `Failed to check existence: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }
}

export async function sendOtp(username: string) {
  try {
    const res = await fetch(`${BASE_URL}${SEND_OTP}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    });
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(
      `Failed to send Otp: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

export async function otpLoginFn(input: { username: string; code: string }) {
  try {
    const res = await fetch(`${BASE_URL}${LOGIN_VIA_OTP}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(
      `Failed to login via otp : ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }
}

export async function passwordLoginFn(input: {
  username: string;
  password: string;
}) {
  try {
    const res = await fetch(`${BASE_URL}${LOGIN_VIA_PASSWORD}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(
      `Failed to login via password : ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }
}
