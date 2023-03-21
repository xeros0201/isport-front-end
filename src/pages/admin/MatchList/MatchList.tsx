import { Page, Row } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import { TextInput } from "../../../components/input";
import { useEffect, useMemo, useState } from "react";
import MatchTable from "../../../components/tables/MatchTable";
import { useQuery } from "react-query";
import { getMatchesBySeason } from "../../../api/matches";
import { MatchFilter } from "../../../components/filters";
import useSearchParamsState from "../../../hooks/useSearchParamsState";

const MatchList = () => {
    const navigate = useNavigate();
    const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
    const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
    const [teamName, setTeamName] = useSearchParamsState("teamName", "");

    // Fetch data
    const { isLoading, data: matches, refetch } = useQuery(
        ["getMatchesBySeason"], async () => await getMatchesBySeason(+seasonId)
    );

    // Fetch as soon as a seasonId is provided
    useEffect(() => {
        if (!seasonId) return;
        refetch();
    }, [seasonId]);

    // Filter data to match query  
    const filteredMatches = useMemo(() => {
        if (!matches) return [];
        return matches.filter((match: Match) => match.homeTeam.name.toLowerCase().includes(teamName.toLowerCase()) 
            || match.awayTeam.name.toLowerCase().includes(teamName.toLowerCase()));
    }, [matches, setTeamName]);

    return (
        <Page title="Matches">
            <Row alignItems='center' disableWrapping noFlex >             
                <h1>Matches</h1>         
                <Button
                    label="New Match"
                    onClick={() => navigate('/admin/matches/new')}
                    icon="IoAdd"
                />
            </Row>
            <MatchFilter 
                leagueId={leagueId}
                onLeagueChange={setLeagueId}
                seasonId={seasonId}
                onSeasonChange={setSeasonId}
                teamName={teamName}
                onTeamNameChange={setTeamName}
            />
            <MatchTable data={filteredMatches} isLoading={isLoading} />
        </Page>
    );
};

export default MatchList;