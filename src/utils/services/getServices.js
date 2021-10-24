import axios from "axios";
import baseURL from "../../configs/baseURL";
import cookie from "js-cookie";

export const getProtectedData = async (path, tokens) => {
  try {
    const token = cookie.get("token");
    const response = await axios.get(`${baseURL}/${path}`, {
      headers: {
        Authorization: `Bearer ${token || tokens.token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
    console.log(error);
    if (error.response.data.error.status === 401) {
      return { error: error.response.data.error };
    }
    console.log(error.response);
  }
};

export const getData = async (path) => {
  try {
    const response = await axios.get(`${baseURL}/${path}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getOrders = async (limit, page) => {
  try {
    const response = await axios.get(`${baseURL}/admin/orders`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getLoggedUser = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/users/details`, {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
