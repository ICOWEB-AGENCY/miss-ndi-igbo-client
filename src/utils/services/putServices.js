import axios from "axios";
import baseURL from "../../configs/baseURL";
import cookie from "js-cookie";

export const logUser = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, data);

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const putProtectedData = async (data, path, tokens) => {
  try {
    const response = await axios.put(`${baseURL}/${path}`, data, {
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.response.data;
  }
};

export const putData = async (data, path) => {
  try {
    const response = await axios.put(`${baseURL}/` + path, data);

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
export const changePassword = async (data) => {
  try {
    const token = cookie.get("token");
    const response = await axios.put(
      `${baseURL}/admin/auth/change-pass`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
