import { Page, Row } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import { TextInput } from "../../../components/input";
import { useMemo, useState } from "react";
import MatchTable from "../../../components/tables/MatchTable";
import { useQuery } from "react-query";
import { getMatches } from "../../../api/matches";
import { LeagueDropdown, SeasonDropdown } from "../../../components/dropdowns";
import RowItem from "../../../components/layout/Row/RowItem";

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
            <Row alignItems='center' disableWrapping noFlex rowType={1} >
                <RowItem noFlex>
                    <h1>Matches</h1>
                </RowItem>
                <RowItem noFlex>
                    <Button
                        label="New Match"
                        onClick={() => navigate('/admin/matches/new')}
                        icon="IoAdd"
                    />
                </RowItem>
            </Row>
            <Row removeSpacing rowMarginTop={20} rowType={1}>
                <RowItem flexGrow={8}>
                    <TextInput
                        placeholder="Search..."
                        value={query}
                        onChange={setQuery}
                        icon="IoSearch"
                        rounded
                        noMargin
                    />
                </RowItem>
                <RowItem >
                    <LeagueDropdown
                        value={"League"}
                        onChange={() => {}}
                    />
                </RowItem>
                <RowItem >
                    <SeasonDropdown
                        value={"Season"}
                        onChange={() => {}}
                    />
                </RowItem>
            </Row>
            <MatchTable data={filteredMatches} isLoading={isLoading} />
        </Page>
    );
};

export default MatchList;