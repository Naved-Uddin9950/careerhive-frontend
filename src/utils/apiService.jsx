import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

export const postAPI = async (url, params, toast) => {
    try {
        const response = await axios.post(`${baseURL}${url}`, params, {
            headers: {
            },
        });
        return response;
    } catch (error) {

        toast.error(error.message);
        return error;
    }
};