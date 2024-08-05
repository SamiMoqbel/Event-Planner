import "./Fieldset.css";

interface FieldsetProps {
  val: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name: string;
  label: string;
  isTextArea?: boolean;
  isDate?: boolean;
}

const Fieldset: React.FC<FieldsetProps> = ({
  val,
  onChange,
  name,
  label,
  isTextArea = false,
  isDate = false,
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
      ) : isDate ? (
        <input
          className="input-styles"
          type="date"
          name={name}
          value={val}
          onChange={(e) => onChange(e)}
        />
      ) : (
        <input
          className="input-styles"
          type="text"
          name={name}
          maxLength={30}
          value={val}
          onChange={(e) => onChange(e)}
        />
      )}
    </fieldset>
  );
};

export default Fieldset;
