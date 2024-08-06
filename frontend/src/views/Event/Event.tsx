import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { Controls } from "./Controls";
import { EventsBoard } from "./EventsBoard";
import { FormModal } from "../../components";
import { deleteData, getData, postData, putData } from "../../apis";
import { EventData } from "../../types";
import "./Event.css";
import toast from "react-hot-toast";

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
    setLoading(true);
    getData("http://localhost:5000/events").then((data: []) => {
      setLoading(false);
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
      });
    });
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

  const handleDeleteButton = async (eventId: string) => {
    try {
      await deleteData("http://localhost:5000/remove-card/", eventId);
      toast.success("Event deleted successfully");
      setEvents((prevEvents) =>
        prevEvents.filter((item) => item.id !== eventId)
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlePost = async (data: EventData) => {
    postData("http://localhost:5000/add-card", data);
  };

  const handlePut = (data: EventData) => {
    putData("http://localhost:5000/edit-card/", data);
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
        onSubmit={editing ? (formInfo) => handlePut(formInfo) : handlePost}
      />
    </div>
  );
};

export default Event;
