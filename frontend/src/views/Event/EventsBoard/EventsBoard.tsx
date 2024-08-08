import { EventData } from "../../../types";
import { EventDetails } from "../../EventDetails";
import "./EventsBoard.scss";

interface EventsBoardProps {
  events: EventData[];
  onEdit: (event: EventData) => void;
  setEvents?: any;
}

const EventsBoard: React.FC<EventsBoardProps> = ({
  events,
  onEdit,
  setEvents,
}) => {
  return (
    <div id="events-board" className="events-board">
      {events.length > 0 &&
        events.map((event) => (
          <EventDetails
            key={event.id}
            event={event}
            onEdit={() => onEdit(event)}
            setEvents={setEvents}
          />
        ))}
    </div>
  );
};

export default EventsBoard;
