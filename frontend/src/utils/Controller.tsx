import axios, { Method } from "axios";

export const sendRequest = async (
  url: string,
  method: Method,
  options: { resolved: (data: any) => void; rejected: () => void },
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
    options.rejected();
    throw new Error(error.response ? error.response.data : error.message);
  }
};
