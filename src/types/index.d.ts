import { MatchType } from "./../components/dropdowns/MatchTypeDropdown";
import * as reactIcon from "react-icons/all";
import { _ReactIcon } from "../components/common/Icon/Icon";
import { Role } from "./enums";

export enum Role {
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

declare global {
  type ReactIcon = _ReactIcon;
  type MatchType = typeof MatchType[keyof typeof MatchType];

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
    role: Role;
    createdDate: string;
    createdUserId: string;
    updatedDate: string;
    updatedUserId: string;
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
    createdDate: string;
    createdUserId: string;
    updatedDate: string;
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

  interface Location {
    id: string;
    name: string;
  }

  interface Team {
    id: number;
    name: string;
    logo: string;
    seasonId: string;
  }

  interface Player {
    id: number;
    name: string;
    team_id: number;
    playerNumber?: number;
  }

  interface PlayerOnMatch {
    id: number;
    matchId: number;
    playerId: number;
    playerNumber: number;
    teamId: number;
  }

  interface Match {
    id: number;
    seasonId: number;
    homeTeamId: number | null;
    homeTeamCsv: string | null;
    awayTeamId: number | null;
    awayTeamCsv: string | null;
    round: number;
    type: MatchType;
    date: string;
    teamId: number;
    locationId: number;
    awayTeam: Team;
    homeTeam: Team;
    location: Location;
    players: PlayerOnMatch[];
  }

  interface Player {
    id: number;
    teamId: number;
    name: string;
    playerNumber: number;
    leagueId: number;
    createdDate: string;
    team: Team;
    league: League;
  }

  interface CSVRow {
    Code: string;
  }
}

export {};
