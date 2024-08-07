import axios, { Method } from "axios";

export const sendRequest = async (
  url: string,
  method: Method,
  options: { resolved: (data: any) => void; rejected: (error: any) => void },
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

    options.resolved(response.data);
  } catch (error: any) {
    options.rejected(error.response ? error.response.data : error.message);
  }
};
