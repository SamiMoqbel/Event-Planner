import axios, { Method } from "axios";

export const sendRequest = async (
  url: string,
  method: Method,
  options: {
    onSuccess?: (data: any) => void;
    onFailure?: (error: any) => void;
  },
  data?: any
) => {
  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    if (options.onSuccess) {
      options.onSuccess(response.data);
    }
  } catch (error: any) {
    if (options.onFailure) {
      options.onFailure(error.response ? error.response.data : error.message);
    }
  }
};
