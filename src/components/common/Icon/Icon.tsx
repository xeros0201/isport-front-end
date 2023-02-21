import * as reactIcon from "react-icons/fa";
import { IconBaseProps } from "react-icons";

interface IconProps extends IconBaseProps {
  name: ReactIcon;
}

const Icon = ({ name, ...props }: IconProps) => {
  return reactIcon[name]({...props, className: 'icon'});
}

export default Icon;
