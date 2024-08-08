import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { Controls } from "./Controls";
import { EventsBoard } from "./EventsBoard";
import { getData } from "../../apis";
import { EventData } from "../../types";
import "./Event.scss";
import toast from "react-hot-toast";
import { getDate } from "../../utils";
import { Form } from "../Form";

const Event = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const [formData, setFormData] = useState<EventData>({
    id: "",
    title: "",
    date: "",
    description: "",
  });

  const loadSuccess = (data: any) => {
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
  };

  const loadFail = (error: any) => {
    toast.error(error.message);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const getEvent = async () => {
      await getData({ onSuccess: loadSuccess, onFailure: loadFail });
    };

    getEvent();
  }, []);

  const handleFormOpen = (event?: EventData) => {
    if (event) {
      console.log("edit event");
      setFormData(event);
    } else {
      console.log("add event");
      const date = getDate();
      setFormData({
        id: "",
        title: "New Title",
        date: date,
        description: "",
      });
    }
    setFormOpened(true);
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
      <Controls title="Events Dashboard" onAdd={handleFormOpen} />
      {loading ? (
        <div className="loader-spinner">
          <RingLoader />
        </div>
      ) : (
        <EventsBoard
          onEdit={handleFormOpen}
          events={events}
          setEvents={setEvents}
        />
      )}
      {formOpened && (
        <Form
          setEvents={setEvents}
          data={formData}
          onClose={() => handleClose()}
          setFormOpened={setFormOpened}
        />
      )}
    </div>
  );
};

export default Event;
