/**
 * Try importing from just the one icon set to reduce import size.
 * Icon sets: https://react-icons.github.io/react-icons
 */
import * as reactIcon from "react-icons/io5";
import { IconBaseProps } from "react-icons";

// Export this type so that it can be made global in index.d.ts
// NOTE: This does not need to be changed.
export type _ReactIcon = keyof typeof reactIcon;

interface IconProps extends IconBaseProps {
  name: ReactIcon;
}

const Icon = ({ name, ...props }: IconProps) => {
  if (!name || !reactIcon || !reactIcon[name]) return null;
  return (
    reactIcon[name]({
      ...props,
      className: props.className + ' icon',
      fontSize: 18
    })
  );
}

export default Icon;
