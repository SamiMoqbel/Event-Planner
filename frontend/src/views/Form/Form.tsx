import { useEffect, useState } from "react";
import { Fieldset, FormModal } from "../../components";
import { EventData } from "../../types";
import { postData, putData } from "../../apis";
import toast from "react-hot-toast";
import "./Form.scss";

interface FormProps {
  data?: any;
  onClose: () => void;
  setEvents?: any;
  setFormOpened?: any;
}

export const Form: React.FC<FormProps> = ({
  data,
  onClose,
  setEvents,
  setFormOpened,
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

  const onFailure = (error: any) => {
    toast.error(error.message);
  };

  const onEditSuccess = (data: any) => {
    toast.success("Event Edited successfully");
    setEvents((prevEvents: any[]) =>
      prevEvents.map((item) =>
        item.id === data._id ? (data as EventData) : item
      )
    );
    setFormOpened(false);
  };

  const onAddSuccess = (data: any) => {
    toast.success("Event Added successfully");
    setEvents((prevEvents: any) => [...prevEvents, data]);
    setFormOpened(false);
  };

  const handlePost = async (data: EventData) => {
    await postData(data, { onSuccess: onAddSuccess, onFailure: onFailure });
  };

  const handlePut = async (data: EventData) => {
    await putData(data, { onSuccess: onEditSuccess, onFailure: onFailure });
  };

  const handleSubmitClick = (event: React.MouseEvent) => {
    event.preventDefault();
    formInfo.id ? handlePut(formInfo) : handlePost(formInfo);
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onClose();
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
