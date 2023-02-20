import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./IconInput.scss";
// import { FaFontAwesome } from "react-icons/fa";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

interface IconInputProps {
  name: IconProp;
  size?: SizeProp;
  color?: string;
}

/**
 * Text input component with preconfigured styling.
 */
const IconInput = ({ name, size, color }: IconInputProps) => {
  return (
    <div className="iconinput">
      <FontAwesomeIcon icon={name} size={size} color={color} />
    </div>
  );
};

export default IconInput;
