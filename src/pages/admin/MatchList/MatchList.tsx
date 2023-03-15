import { Page, Row } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import { TextInput } from "../../../components/input";
import { useMemo, useState } from "react";
import MatchTable from "../../../components/tables/MatchTable";
import { useQuery } from "react-query";
import { getMatches } from "../../../api/matches";
import { LeagueDropdown, SeasonDropdown } from "../../../components/dropdowns";

const MatchList = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    // Fetch data
    const { isLoading, data: matches } = useQuery(
        ["getMatches"], async () => await getMatches()
    );

    // Filter data to match query  
    const filteredMatches = useMemo(() => {
        if (!matches) return [];
        return matches;
        // return matches.filter((match: Match) => match.name.toLowerCase().includes(query.toLowerCase()));
        //MatchEntity has no name...
    }, [matches, query]);

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
            <Row removeSpacing>
                <TextInput
                    placeholder="Search..."
                    value={query}
                    onChange={setQuery}
                    icon="IoSearch"
                    rounded
                    noMargin
                />
                <LeagueDropdown
                    value={"League"}
                    onChange={() => {}}
                />
                <SeasonDropdown
                    value={"Season"}
                    onChange={() => {}}
                />
            </Row>
            <MatchTable data={filteredMatches} isLoading={isLoading} />
        </Page>
    );
};

export default MatchList;