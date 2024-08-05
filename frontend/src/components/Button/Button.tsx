import "./Button.css";

interface ButtonProps {
    onClick: () => void,
    label: string,
    classes?: string,
}

const Button: React.FC<ButtonProps> = ({ label ,classes, onClick }) => {
  return (
    <button
      id="custom-button"
      onClick={onClick}
      className={`${classes} custom-button`}
    >
      {label}
    </button>
  );
};

export default Button;
