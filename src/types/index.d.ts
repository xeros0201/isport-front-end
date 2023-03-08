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

  interface Sport {
    id: number;
    name: string;
  }

  interface League {
    id: number;
    logo: string;
    sportId: number;
    sport: Sport;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    createdUserId: string;
    updatedUserId: string;
  }

  interface Season {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    leagueId: number;
    createdDate: string;
    createdUserId: string;
    updatedDate: string;
    updatedUserId: string;
    league: League;
  }

  interface Team {
    id: number;
    name: string;
    logo: string;
    seasonId: number;
    createdDate: Date;
    updatedDate: Date;
    createdUserId: string;
    updatedUserId: string;
  }

  interface Match {
    id: number;
    homeTeamCsv: string;
    awayTeamCsv: string;
    leagueId: string;
    seasonId: string;
    homeTeamId: string;
    awayTeamId: string;
    round: string;
    type: string;
    locationId: string;
    date: string;
    createdDate: Date;
    updatedDate: Date;
    createdUserId: string;
    updatedUserId: string;
  }

  interface Location {
    id: number;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    createdUserId: string;
    updatedUserId: string;
  }

  interface Player {
    id: number;
    teamId: number;
    name: string;
    playerNumber: number;

    createdDate: Date;
    updatedDate: Date;
    createdUserId: string;
    updatedUserId: string;
  }

  interface CSVRow {
    Code: string;
  }
}

export {};
