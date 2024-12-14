import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

export const postAPI = async (url, params, toast) => {
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

// export const postAPIAuth = async (url, params, toast) => {
//     try {
//         const response = await axios.post(`${baseURL}${url}`, params, {
//             headers: {
//             },
//         });
//         return response;
//     } catch (error) {

//         toast.error(error.message);
//         return error;
//     }
// };
