import { RegisterFormData } from "../pages/register";
import { SignInFormData } from "../pages/sign-in";

const BASE_URL = "http://localhost:7000";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include", //to send the cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const resBody = await response.json();

  if (!response.ok) {
    throw new Error(resBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/validate-token`, {
    method: "GET",
    credentials: "include", //to send the cookie along with the request
  });
  const resBody = await response.json();
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return resBody;
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include", //to send the cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const resBody = await response.json();

  if (!response.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
};

export const signOut = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include", //to send the cookie along with the request
  });
  if (!response.ok) {
    throw new Error("Logout failed");
  }
};
