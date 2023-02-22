import * as reactIcon from "react-icons/all";
import { _ReactIcon } from "../components/common/Icon/Icon";

declare global {
  
  type ReactIcon = _ReactIcon;

  interface League {
    id: number;
    sportId: number;
    name: string;
  };

}

export {};
