import { Page, Row } from "../../../components/layout";
import { useQuery } from "react-query";
import { getLeagues } from "../../../api/leagues";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import { TextInput } from "../../../components/input";
import { useMemo, useState } from "react";
import { LeagueTable } from "../../../components/tables";

const LeagueList = () => {
    const [query, setQuery] = useState('');

    // Fetch data
    const { isLoading, data: leagues } = useQuery(
        ["getLeagues"], async () => await getLeagues()
    );

    // Filter data to match query  
    const filteredLeagues = useMemo(() => {
        if (!leagues) return [];
        return leagues.filter((league: any) => league.name.toLowerCase().includes(query.toLowerCase()));
    }, [leagues, query]);

    const navigate = useNavigate();

    return (
        <Page title="Leagues">
            <Row alignItems='center' disableWrapping noFlex>
                <h1>Leagues</h1>
                <Button
                    label="New League"
                    onClick={() => navigate('/admin/leagues/new')}
                />
            </Row>
            <TextInput
                placeholder="Search..."
                value={query}
                onChange={setQuery}
                rounded
            />
            <LeagueTable data={filteredLeagues} isLoading={isLoading} />
        </Page>
    );
};

export default LeagueList;