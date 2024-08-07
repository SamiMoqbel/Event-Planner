import { EventData } from "../types";
import { sendRequest } from "../utils";

export const getData = async (options: {
  resolved: (data: any) => void;
  rejected: (error: any) => void;
}): Promise<any> => {
  return sendRequest("/api/events/", "GET", options);
};

export const postData = async (
  data: EventData,
  options: { resolved: (data: any) => void; rejected: (error: any) => void }
): Promise<any> => {
  return sendRequest("/api/add-card", "POST", options, data);
};

export const putData = async (
  data: EventData,
  options: { resolved: (data: any) => void; rejected: (error: any) => void }
): Promise<any> => {
  return sendRequest(`/api/edit-card/${data.id}`, "PUT", options, data);
};

export const deleteData = async (
  eventID: string,
  options: { resolved: (data: any) => void; rejected: (error: any) => void }
) => {
  return await sendRequest(`/api/remove-card/${eventID}`, "DELETE", options, {
    cardId: eventID,
  });
};
