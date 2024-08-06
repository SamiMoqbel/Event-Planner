import "./Button.css";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  classes?: string;
}

const Button: React.FC<ButtonProps> = ({ children, classes, onClick }) => {
  return (
    <button
      id="custom-button"
      onClick={onClick}
      className={`${classes} custom-button`}
    >
      {children}
    </button>
  );
};

export default Button;
