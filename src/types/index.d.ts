import * as reactIcon from "react-icons/all";
import { _ReactIcon } from "../components/common/Icon/Icon";
import { MatchStatus, MatchType } from "../constants";
import { Role } from "./enums";

declare global {
  type ReactIcon = _ReactIcon;
  type MatchType = typeof MatchType[keyof typeof MatchType];
  type MatchStatus = typeof MatchStatus[keyof typeof MatchStatus];

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

  interface PlayerOnMatch {
    id: number;
    matchId: number;
    playerId: number;
    playerNumber: number;
    teamId: number;
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
    status?: MatchStatus;
    seasonId: number;
    season: Season;
    homeTeamId: number | null;
    homeTeamCsv: string | null;
    awayTeamId: number | null;
    awayTeamCsv: string | null;
    round: number;
    type: MatchType;
    date: string;
    dateOnly: string | null;
    teamId: number;
    locationId: number;
    awayTeam: Team;
    homeTeam: Team;
    location: Location;
    players: PlayerOnMatch[];
    aflResults: AflResults[];
  }

  interface MatchValidation {
    isValid: boolean;
    errors: any;
  }

  interface ScoreDistribution {
    name: string;
    homeScore: number;
    awayScore: number;
  }

  interface Player {
    id: number;
    createdDate: string;
    createdUserId: string;
    league: League;
    leagueId: number;
    name: string;
    playerNumber: number;
    leagueId: number;
    createdDate: string;
    team?: {
      id: number;
      name: string;
      logo: any;
      seasonId: number;
      season: Season;
    };
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
