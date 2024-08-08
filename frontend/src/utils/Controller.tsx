import axios, { Method } from "axios";

export const sendRequest = async (
  url: string,
  method: Method,
  options: { onSuccess: any; onFailure: any },
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

    console.log("Success:", response.data);
    options.onSuccess(response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    options.onFailure();
    throw new Error(error.response ? error.response.data : error.message);
  }
};
