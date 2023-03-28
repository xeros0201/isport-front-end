interface MatchReportValue {
    home: number;
    away: number;
    diff: number;
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
    resultProperty: AflResultProperties;
    value: MatchReportValue;
}

interface AflResult {
    team: Team;
    player: Player[];
}

interface Stats {
    reports: Record<string, ReportOnMatches[]>;
    aflResult?: AflResult[];
}