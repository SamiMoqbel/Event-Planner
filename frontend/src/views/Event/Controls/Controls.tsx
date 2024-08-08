import { Button } from "../../../components";
import "./Controls.scss";

interface ControlsProps {
  title: string;
  onAdd: () => void;
}

const Controls: React.FC<ControlsProps> = ({ title, onAdd }) => {
  return (
    <div id="controls-container" className="controls-container">
      <h2>{title}</h2>
      <Button onClick={() => onAdd()} classes={"add-button"}>
        Add Event
      </Button>
    </div>
  );
};

export default Controls;
