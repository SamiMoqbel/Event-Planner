import { Button } from "../";

import "./Card.css";

interface CardProps {
  title: string;
  desc: string;
  date: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ onEdit, title, desc, date, onDelete }) => {
  const today = new Date();
  const eventDate = new Date(date);
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
    <div id="card-container" className="card-container">
      <div className={`${titleBg} text-end`}>
        <button onClick={onDelete} id="delete-button" className="delete-button">
          X
        </button>
      </div>
      <div id="title" className={`${titleBg} title`}>
        {title}
      </div>
      <div id="content" className="content">
        <div className="px-1">
          <p id="description" className="description">
            {desc}
          </p>
          <p>{date}</p>
        </div>
        <Button onClick={onEdit} classes="info-button">Show Info</Button>
      </div>
    </div>
  );
};

export default Card;
