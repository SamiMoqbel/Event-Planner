import { HTMLInputTypeAttribute } from "react";
import "./Fieldset.scss";

interface FieldsetProps {
  val?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  isTextArea?: boolean;
}

export const Fieldset: React.FC<FieldsetProps> = ({
  val,
  onChange,
  name,
  label,
  isTextArea = false,
  type = "text",
}) => {
  return (
    <fieldset id="fieldset-container" className="fieldset-container">
      <legend id="legend" className="legend ">
        {label}
      </legend>
      {isTextArea ? (
        <textarea
          className="input-styles textarea"
          name={name}
          value={val}
          onChange={(e) => onChange(e)}
        />
      ) : (
        <input
          className="input-styles"
          type={type}
          name={name}
          maxLength={30}
          value={val}
          onChange={(e) => onChange(e)}
        />
      )}
    </fieldset>
  );
};

