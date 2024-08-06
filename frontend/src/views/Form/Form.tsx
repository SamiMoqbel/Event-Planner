import { useEffect, useState } from "react";
import { Fieldset, FormModal } from "../../components";

interface FormProps {
  data?: any;
  onClose: () => void;
  onSubmit: (formInfo: any, id?: string) => void;
}

export const Form: React.FC<FormProps> = ({ data, onClose, onSubmit }) => {
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
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onClose();
    console.log("Cancelled");
  };
  
  return (
    <div>
      <FormModal onClose={onClose}>
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
          type="date"
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
      </FormModal>
    </div>
  );
};
