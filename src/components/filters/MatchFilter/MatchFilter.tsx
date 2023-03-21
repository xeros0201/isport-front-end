import React from "react";
import "./MatchFilter.scss";
import { LeagueDropdown, SeasonDropdown } from "../../../components/dropdowns";
import { TextInput } from "../../input";
import { Row } from "../../layout";

interface MatchFilterProps {
    leagueId: string;
    seasonId: string;
    teamName: string;
    onLeagueChange: (value: string) => void;
    onSeasonChange: (value: string) => void;
    onTeamNameChange: (value: string) => void;
}

const MatchFilter = ({
    leagueId,
    seasonId,
    teamName,
    onLeagueChange,
    onSeasonChange,
    onTeamNameChange
} : MatchFilterProps) => {
    return (
        <div className="match-filter">
            <Row alignItems="center" justifyContent="flex-start" disableWrapping noFlex isWrapRowItem={false}>
                <div style={{flex: 10}}>
                    <TextInput
                        placeholder="Search..."
                        value={teamName}
                        onChange={onTeamNameChange}
                        icon="IoSearch"
                        rounded
                        noMargin
                    />
                </div>
                <div style={{flex: 1}}>
                    <LeagueDropdown
                        value={leagueId}
                        onChange={onLeagueChange}
                    />
                </div>
                <div style={{flex: 1}}>
                    <SeasonDropdown
                        value={seasonId}
                        onChange={onSeasonChange}
                    />
                </div>
            </Row >
        </div>
    )
}

export default MatchFilter;