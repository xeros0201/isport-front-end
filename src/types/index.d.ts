import { DateTime } from "luxon";
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

<<<<<<< HEAD
=======
  interface Location {
    id: string;
    name: string;
  }

>>>>>>> remotes/origin/develop
  interface Team {
    id: number;
    name: string;
    logo: string;
<<<<<<< HEAD
    seasonId: number;
=======
    seasonId: string;
>>>>>>> remotes/origin/develop
  }

  interface Match {
    id: number;
<<<<<<< HEAD
    leagueId: number;
    leagueName: string;
    seasonId: number;
    seasonName: string;
    homeTeamId: number;
    homeTeamName: string;
    homeTeamCsv: string;
    awayTeamId: number;
    awayTeamName: string;
    awayTeamCsv: string;
    round: number;
    date: Date;
    teamId: number;
    locationId: number;
  }
=======
    seasonId: number;
    homeTeamId: number | null;
    homeTeamCsv: string | null;
    awayTeamId: number | null;
    awayTeamCsv: string | null;
    round: number;
    date: string;
    teamId: number;
    locationId: number;
    awayTeam: Team;
    homeTeam: Team;
    location: Location;
  }

>>>>>>> remotes/origin/develop
}

export {};
