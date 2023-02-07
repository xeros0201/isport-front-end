import "./InputLabel.scss";
import React from "react";
import { InputLabelProps } from "../../../types/inputs";

/**
 * The label used for input components.
 */
const InputLabel: React.FC<InputLabelProps> = ({ label, required = false }) => {
  /**
   * Return nothing if label wasn't provided;
   */
  if (!label) {
    return null;
  }

  return (
    <div className="inputlabel">
      {required && <div className="inputlabel__required">*</div>}
      <label className="inputlabel__label">{label}</label>
    </div>
  );
};

export default InputLabel;
