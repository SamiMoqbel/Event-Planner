import { useEffect, useState } from "react";
import { Fieldset } from "../index";
import "./FormModal.css";

interface FormModalProps {
  data?: any;
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (formInfo: any, id?: string) => void;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpened = false,
  onClose,
  data,
  onSubmit,
}) => {
  const [formInfo, setFormInfo] = useState(data);

  useEffect(() => {
    setFormInfo(data);
  }, [data]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmitClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onSubmit(formInfo, data?.id);
    window.location.reload();
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onClose();
    console.log("Cancelled");
  };

  const handleOutlayerClose = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="outer-layer"
      onClick={handleOutlayerClose}
      className={`${isOpened ? "" : "closed"} outer-layer`}
    >
      <div id="form-dialog" className="form-dialog">
        <form>
          <Fieldset
            label="Title"
            name="title"
            onChange={handleChange}
            val={formInfo.title}
          />
          <Fieldset
            label="Due Date"
            name="date"
            onChange={handleChange}
            val={formInfo.date}
            isDate
          />
          <Fieldset
            label="Description"
            name="description"
            onChange={handleChange}
            val={formInfo.description}
            isTextArea
          />

          <div id="form-controls" className="form-controls">
            <button
              className="controls-styles cancel-style"
              onClick={(e) => handleCancelClick(e)}
            >
              Cancel
            </button>
            <button
              className="controls-styles submit-styles"
              onClick={(e) => handleSubmitClick(e)}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
