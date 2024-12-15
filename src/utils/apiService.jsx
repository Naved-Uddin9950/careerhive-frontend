import axios from "axios";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_API_URL;

export const postAPI = async (url, params) => {
  try {
    const response = await axios.post(`${baseURL}${url}`, params, {
      headers: {},
    });
    return response;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};

export const getApiAuth = async (url, token) => {
  try {
    const response = await axios.get(`${baseURL}${url}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};

export const deleteApi = async (url, token) => {
  try {
    const response = await axios.delete(`${baseURL}${url}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};

export const getApi = async (url) => {
  try {
    const response = await axios.get(`${baseURL}${url}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};

export const postAPIAuth = async (url, params, token) => {
  try {
    const response = await axios.post(`${baseURL}${url}`, params, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    // toast.error(error.message);
    return error;
  }
};
