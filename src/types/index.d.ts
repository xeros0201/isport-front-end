import { DateTime } from "luxon";
import * as reactIcon from "react-icons/all";
import { _ReactIcon } from "../components/common/Icon/Icon";
import { Role } from "./enums";

declare global {
  type ReactIcon = _ReactIcon;

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
    seasonId: number;
    season: Season;
  }

  interface Player {
    id: number;
    name: string;
    team_id: number;
    playerNumber?: number;
  }

  interface AflResults {
    id: number;
    matchId: number;
    teamId: number;
    scorePrimary: number;
    scoreSecondary: string;
    team: Team;
  }

  interface Match {
    id: number;
    seasonId: number;
    season: Season;
    homeTeamId: number | null;
    homeTeamCsv: string | null;
    awayTeamId: number | null;
    awayTeamCsv: string | null;
    round: number;
    date: string;
    dateOnly: string | null;
    teamId: number;
    locationId: number;
    awayTeam: Team;
    homeTeam: Team;
    location: Location;
    aflResults: AflResults[];
  }
  interface ScoreDistribution {
    name: string;
    homeScore: number;
    awayScore: number;
  }

  interface Player {
    id: number;
    createdDate: Date;
    createdDate: string;
    createdUserId: string;
    league: League;
    leagueId: number;
    name: string;
    playerNumber: number;
    team: Team;
    teamId: number;
    updatedDate: Date;
    updatedUserId: string;
  }

  interface CSVRow {
    Code: string;
  }

  interface Statistic {
    id: number;
    name: string;
  }
}

export {};
