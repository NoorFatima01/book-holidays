import { RegisterFormData } from "../pages/register";
import { SignInFormData } from "../pages/sign-in";
import { HotelType } from "../../../backend/src/models/hotel";
import { HotelSearchResponse } from "../../../backend/src/models/search";

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
  adultsCapacity?: string;
  childrenCapacity?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOptions?: string;
};
export const searchHotels = async (params: SearchParams):Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  // for searching
  queryParams.append("destination", params.destination || "");
  queryParams.append("checkIn", params.checkIn || "");
  queryParams.append("checkOut", params.checkOut || "");
  queryParams.append("adultsCapacity", params.adultsCapacity || "");
  queryParams.append("childrenCapacity", params.childrenCapacity || "");
  queryParams.append("page", params.page || "");
  // for filtering
  params.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  params.types?.forEach((type) => queryParams.append("types", type));
  params.stars?.forEach((star) => queryParams.append("stars", star));
  queryParams.append("maxPrice", params.maxPrice || "");
  queryParams.append("sortOptions", params.sortOptions || "");
  const response = await fetch(`${BASE_URL}/api/hotels/search?${queryParams}`, {
    method: "GET",
    credentials: "include",
  });
  const resBody = await response.json();
  if (!response.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
};