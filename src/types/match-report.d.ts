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

interface Result {
  meta: any;
  score: number;
  team: Team;
  player: Player[];
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
