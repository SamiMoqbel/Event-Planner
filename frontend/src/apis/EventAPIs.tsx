import { EventData } from "../types";

export const getData: any = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const postData = async (url: string, data: EventData) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const putData: any = async (url: string, data: EventData) => {
  fetch(`${url}${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const deleteData = (url: string, eventID: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${url}${eventID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId: eventID }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success:", responseData);
        resolve(responseData);
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        reject(new Error("Network response was not ok"));
      }
    } catch (error) {
      console.error("Error:", error);
      reject(error);
    }
  });
};
