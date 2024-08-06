import "./FormModal.css";

interface FormModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ onClose, children }) => {
  const handleOutlayerClose = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      id="outer-layer"
      onClick={handleOutlayerClose}
      className={`outer-layer`}
    >
      <div id="form-dialog" className="form-dialog">
        <form>{children}</form>
      </div>
    </div>
  );
};

export default FormModal;
