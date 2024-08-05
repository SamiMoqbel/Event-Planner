import { Card } from "../../../components";
import "./EventsBoard.css";

interface EventData {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface DashboardProps {
  events: EventData[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ events, onDelete, onEdit }) => {
  return (
    <div id="events-board" className="events-board">
      {events.length > 0 &&
        events.map((event) => (
          <Card
            key={event.id}
            title={event.title}
            date={event.date}
            desc={event.description}
            onEdit={() => onEdit(event.id)}
            onDelete={() => onDelete(event.id)}
          />
        ))}
    </div>
  );
};

export default Dashboard;
