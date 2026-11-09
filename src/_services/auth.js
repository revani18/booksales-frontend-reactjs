import { API } from "../_api";
import { useJwt } from "react-jwt";

export const login = async (data) => {
  try {
    const response = await API.post("/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await API.post("/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await API.post("/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    delete API.defaults.headers.common["Authorization"];
  }
};

export const useDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  try {
    if (isExpired) {
      return {
        success: false,
        message: "Token expired",
        data: null,
      };
    }

    if (!decodedToken) {
      return {
        success: false,
        message: "Token invalid",
        data: null,
      };
    }

    return {
      success: true,
      message: "Token valid",
      data: decodedToken,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
