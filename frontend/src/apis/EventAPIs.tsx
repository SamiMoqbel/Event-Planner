import { EventData } from "../types";

export const getData = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:5000/events/");

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

export const postData = async (data: EventData): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:5000/add-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

export const putData: any = async (data: EventData): Promise<any> => {
  fetch(`http://localhost:5000/edit-card/${data.id}`, {
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

export const deleteData = (eventID: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:5000/remove-card/${eventID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cardId: eventID }),
        }
      );

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
