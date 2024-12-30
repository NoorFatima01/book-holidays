import { RegisterFormData } from "../pages/register";
import { SignInFormData } from "../pages/sign-in";
import { HotelType } from "../../../backend/src/models/hotel";
import { HotelSearchResponse } from "../../../backend/src/models/search";
import { UserType } from "../../../backend/src/models/user";


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

export const fetchCurrentUser = async ():Promise<UserType> => {
  const response = await fetch(`${BASE_URL}/api/users/me`, {
    method: "GET",
    credentials: "include", //to send the cookie along with the request
  });
  const resBody = await response.json();
  if (!response.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
};

export const addMyHotel = async (formData: FormData) => {
  const response = await fetch(`${BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include", //to send the cookie
    body: formData,
    headers: {
      // Do not set Content-Type here, it will be automatically set to FormData
    },
  });
  const resBody = await response.json();

  if (!response.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
};

export const getMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${BASE_URL}/api/my-hotels`, {
    method: "GET",
    credentials: "include", //to send the cookie along with the request
  });
  const resBody = await response.json();

  if (!response.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
};

export const getMyHotelById = async (hotedId: string): Promise<HotelType> => {
  const response = await fetch(`${BASE_URL}/api/my-hotels/${hotedId}`, {
    method: "GET",
    credentials: "include", //to send the cookie along with the request
  });
  const resBody = await response.json();
  if (!response.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
};
export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${BASE_URL}/api/my-hotels//${hotelFormData.get("_id")}`,
    {
      method: "PUT",
      credentials: "include",
      body: hotelFormData,
    }
  );
  const resBody = await response.json();
  if (!response.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
  page?: string;
};
export const searchHotels = async (params: SearchParams):Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", params.destination || "");
  queryParams.append("checkIn", params.checkIn || "");
  queryParams.append("checkOut", params.checkOut || "");
  queryParams.append("adults", params.adults || "");
  queryParams.append("children", params.children || "");
  queryParams.append("page", params.page || "");
  const response = await fetch(`${BASE_URL}/api/hotels/search?${queryParams}`, {
    method: "GET",
  });
  const resBody = await response.json();
  if (!response.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
};


export const fetchHotelById = async (hotelId: string):Promise<HotelType> => {
  const response = await fetch(`${BASE_URL}/api/hotels/${hotelId}`, {
    method: "GET",
  });
  const resBody = await response.json();
  if (!response.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
}