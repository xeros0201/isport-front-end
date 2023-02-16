import "./Checkbox.scss";

type CheckboxProps = {
  /**
   * Add label after checkbox
   */
  label?: string;
  /**
   * return checkbox's value
   */
  onChange: (isChecked: boolean) => void;
};

const Checkbox = ({ label, onChange }: CheckboxProps) => {
  return (
    <div>
      <label className="checkbox">
        {label}
        <input type="checkbox" onChange={(e) => onChange(e.target.checked)} />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default Checkbox;
