// @ts-nocheck
// import { baseURL, TOKEN_NAME } from "@/constants";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
// const token = localStorage.getItem(TOKEN_NAME);

// no auth token required
// export const getAPI = async (url, body) => {
//   // try {
//   const response = await axios.get(`${baseURL}/${url}`, body, {
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//       Accept: "application/json",
//     },
//   });
//   return response;
//   // } catch (error) {
//   // return error
//   // }
// };

// export const getAPIAuth = async (url ,tokenInit , module , label) => {
//   const token = localStorage.getItem(TOKEN_NAME);
//   try {
//     const response = await axios.get(`${baseURL}/${url}`, {
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         Accept: "application/json",
//         Authorization: `Bearer ${tokenInit ? tokenInit : token}`,
//         "module" : module,
//         "label" : label
//       },
//     });

//     return response;
//   } catch (error) {
//     // return  error
//     if (error?.response.data.status === 401 && setToken) {
//       setToken("")
//   }
//     if (error?.response?.data?.msg === "Invalid token") {
//       localStorage.removeItem(TOKEN_NAME);
//       localStorage.removeItem(BT_TOKEN_NAME);
//       setToken("")
//       signOut(auth)
//         .then(() => {
//           // succesToaster("Logged Out")
//         })
//         .catch((error) => {
//           // An error happened.
//         });
//       // window.location.reload(true);
//     }
//     throw new Error(error);
//   }
// };

export const postAPI = async (url, params, toast) => {
  try {
    const response = await axios.post(`${baseURL}${url}`, params, {
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



// export const postAPIAuthFormData = async (url, params , module , label) => {
//   const token = localStorage.getItem(TOKEN_NAME);
//   try {
//     const response = await axios({
//       method: "post",
//       url: `${baseURL}/${url}`,
//       data: params,
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//         "module" : module,
//         "label" : label
//       },
//     });
//     return response;
//   } catch (error) {
//     if (error?.response?.data?.msg === "Invalid token") {
//       // alert('postAPIAuthFormData')
//       localStorage.removeItem(TOKEN_NAME);
//       localStorage.removeItem(ADMIN_FRONTEND_LOGGED_IN_ID);
//       localStorage.removeItem(STOCK_USER_ID);
//       // signOut(auth)
//       //     .then(() => {
//       //         // succesToaster("Logged Out")
//       //     })
//       //     .catch((error) => {
//       //         // An error happened.
//       //     });
//       // window.location.reload(true);
//     }
//     // console.log("error=>", error);
//     throw error;
//   }
// };

// export const deleteAPIAuth = async (url) => {
//   const token = localStorage.getItem(TOKEN_NAME);
//   try {
//     const response = await axios.delete(`${baseURL}/${url}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };
