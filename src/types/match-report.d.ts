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
  scorePrimary: number;
  secondaryScore: number;
  team: Team;
  player: Player[];
}

interface AflResult {
  home?: Result;
  away?: Result;
}

interface Stats {
  reports: Record<string, ReportOnMatches>;
  aflResult?: AflResult;
  match?: Match;
}
