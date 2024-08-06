import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { Controls } from "./Controls";
import { EventsBoard } from "./EventsBoard";
import { deleteData, getData, postData, putData } from "../../apis";
import { EventData } from "../../types";
import "./Event.css";
import toast from "react-hot-toast";
import { getDate } from "../../utils";
import { Form } from "../Form";

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
    const getEvent = async () => {
      try {
        const data = await getData();
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
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    getEvent();
  }, []);

  const handleAddButton = () => {
    setFormOpened(true);
    setEditing(false);
    const date = getDate();

    const formInfo = {
      id: "",
      title: "New Title",
      date: date,
      description: "",
    } as EventData;

    setFormData(formInfo);
  };

  const handleShowInfoButton = (event: EventData) => {
    setFormOpened(true);
    setEditing(true);
    setFormData(event);
  };

  const handleDeleteButton = async (eventId: string) => {
    try {
      await deleteData(eventId);
      toast.success("Event deleted successfully");
      setEvents((prevEvents) =>
        prevEvents.filter((item) => item.id !== eventId)
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlePost = async (data: EventData) => {
    try {
      await postData(data);
      toast.success("Event Added successfully");
      setEvents((prevEvents) => [...prevEvents, data]);
      setFormOpened(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlePut = async (data: EventData) => {
    try {
      await putData(data);
      setEditing(false);
      toast.success("Event Edited successfully");
      setEvents((prevEvents) =>
        prevEvents.map((item) => (item.id === data.id ? data : item))
      );
      setFormOpened(false);
    } catch (error: any) {
      toast.error(error.message);
    }
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
      {formOpened && (
        <Form
          data={formData}
          onClose={() => handleClose()}
          onSubmit={editing ? (formInfo) => handlePut(formInfo) : handlePost}
        />
      )}
    </div>
  );
};

export default Event;
