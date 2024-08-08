import toast from "react-hot-toast";
import { deleteData } from "../../apis";
import { Button, Card } from "../../components";
import { EventData } from "../../types";
import "./EventDetails.scss";

interface EventDetailsProps {
  event: EventData;
  setEvents?: any;
  onEdit: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  onEdit,
  setEvents,
}) => {
  const onDeleteSuccess = () => {
    toast.success(`Event deleted successfully`);
    setEvents((prevEvents: any[]) =>
      prevEvents.filter((item) => item.id !== event.id)
    );
  };

  const onDeleteFailure = (error: any) => {
    toast.error(error.message);
  };

  const handleDeleteButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    eventId: string
  ) => {
    e.preventDefault();
    deleteData(eventId, {
      onSuccess: onDeleteSuccess,
      onFailure: onDeleteFailure,
    });
  };

  const today = new Date();
  const eventDate = new Date(event.date);
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  let titleBg;

  if (eventDate.getTime() < today.getTime()) {
    titleBg = "expired";
  } else if (eventDate.getTime() > today.getTime()) {
    titleBg = "upcoming";
  } else {
    titleBg = "currently-active";
  }

  return (
    <Card>
      <div id="delete-button" className={`${titleBg} text-end`}>
        <button
          onClick={(e) => handleDeleteButton(e, event.id)}
          id="delete-button"
          className="delete-button"
        >
          X
        </button>
      </div>
      <div id="title" className={`${titleBg} title`}>
        {event.title}
      </div>
      <div id="content" className="content">
        <div className="px-1">
          <p id="description" className="description">
            {event.description}
          </p>
          <p>{event.date}</p>
        </div>
        <Button onClick={onEdit} classes="info-button">
          Show Info
        </Button>
      </div>
    </Card>
  );
};
