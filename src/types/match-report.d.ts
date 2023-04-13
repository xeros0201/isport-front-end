interface MatchReportValue {
  home: number;
  away: number;
  diff: number;
  name: string;
}

interface MatchReportTableData extends MatchReportValue {
  name: string;
}

interface AflResultProperties {
  id: number;
  type: string;
  name: string;
  alias: string;
  parentId: number;
  parent: AflResultProperties;
}

interface ReportOnMatches {
  [key: string]: MatchReportValue;
}

interface PlayerOnResult {
  player: {
    id: number;
    name: string;
    playerNumber: number;
  };
  values: Record<string, Record<string, { name: string; value: number }>>;
}

interface Result {
  meta: any;
  score: number;
  team: Team;
  players: PlayerOnResult[];
}

interface AflResult {
  home?: Result;
  away?: Result;
}

interface ReportProps {
  name: string;
  player: Player;
  value: number;
}

interface Reports {
  reports: Record<string, ReportProps[]>;
}

interface LeaderAflResult {
  home?: Reports;
  away?: Reports;
}

interface Stats {
  reports: Record<string, ReportOnMatches>;
  leaders?: LeaderAflResult;
  teamReports?: AflResult;
  match?: Match;
}
