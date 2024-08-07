import "./Button.scss";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  classes?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, classes, onClick }) => {
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

