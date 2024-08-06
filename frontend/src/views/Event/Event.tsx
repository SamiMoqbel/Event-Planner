import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { Controls } from "./Controls";
import { EventsBoard } from "./EventsBoard";
import { FormModal } from "../../components";
import "./Event.css";

export interface EventData {
  id: string;
  title: string;
  date: string;
  description: string;
}

const Event = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const [formData, setFormData] = useState<EventData>({
    id: "",
    title: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    const getEvents: any = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/events");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    getEvents().then((data: []) =>
      data.forEach((event: any) => {
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            id: event._id,
            title: event.title,
            date: event.date,
            description: event.description,
          },
        ]);
      })
    );
  }, []);

  const handleAddButton = () => {
    setFormOpened(true);
    setEditing(false);
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    const formInfo = {
      id: "",
      title: "New Title",
      date: date,
      description: "",
    } as EventData;

    setFormData(formInfo);
  };

  const handleShowInfoButton = (id: string) => {
    setFormOpened(true);
    setEditing(true);
    const event = events.find((event) => event.id === id) as EventData;
    setFormData(event);
  };

  const handleDeleteButton = async (cardId: string) => {
    try {
      fetch(`http://localhost:5000/remove-card/${cardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId: cardId }),
      }).then((response) => {
        if (response.ok) {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== cardId)
          );
        } else {
          throw new Error("Network response was not ok");
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePost = async (data: EventData) => {
    fetch("http://localhost:5000/add-card", {
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

  const handlePut = (data: EventData, cardId: string) => {
    fetch(`http://localhost:5000/edit-card/${cardId}`, {
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
    setEditing(false);
  };

  const handleClose = () => {
    setFormData({
      id: "",
      title: "",
      date: "",
      description: "",
    });
    setFormOpened(false);
  };

  return (
    <div className="events-view">
      <Controls title="Events Dashboard" onAdd={handleAddButton} />
      {loading ? (
        <div className="loader-spinner">
          <RingLoader />
        </div>
      ) : (
        <EventsBoard
          onEdit={handleShowInfoButton}
          events={events}
          onDelete={handleDeleteButton}
        />
      )}
      <FormModal
        data={formData as any}
        isOpened={formOpened}
        onClose={() => handleClose()}
        onSubmit={
          editing ? (formInfo) => handlePut(formInfo, formData.id) : handlePost
        }
      />
    </div>
  );
};

export default Event;
