import "./Card.scss";

interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div id="card-container" className="card-container">
      {children}
    </div>
  );
};
