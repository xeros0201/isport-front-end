import * as reactIcon from "react-icons/fa";

declare global {
  
  type ReactIcon = keyof typeof reactIcon;

  interface League {
    id: number;
    sportId: number;
    name: string;
  };

}

export {};
