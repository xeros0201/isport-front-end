import * as reactIcon from "react-icons/all";
import { _ReactIcon } from "../components/common/Icon/Icon";
import { Role } from "./enums";

export enum Role {
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

declare global {
  type ReactIcon = _ReactIcon;

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
    role: Role;
  }

  interface League {
    id: number;
    logo: string;
    sportId: number;
    name: string;
    createdDate: Date;
    updatedDate: Date;
  }
}

export {};
