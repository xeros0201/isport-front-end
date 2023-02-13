import { Page, Row } from "../../../components/layout";
import { useQuery } from "react-query";
import { getLeagues } from "../../../api/leagues";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner } from "../../../components/common";
import { TextInput } from "../../../components/input";
import { useMemo, useState } from "react";

const LeagueList = () => {
    const [query, setQuery] = useState("");

    // Fetch data
    const { isLoading, data } = useQuery(
        ["getLeagues"], async () => await getLeagues()
    );

    // Filter data to match query  
    const leagues = useMemo(() => {
        if (!data) return [];
        return data.filter((league: any) => league.name.toLowerCase().includes(query.toLowerCase()));
    }, [data, query]);

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
            {/*** This should be rewritten and turned into its own component ***/}
            {isLoading && <Spinner size="large" />}
            {!isLoading && !leagues?.length && <h3>No data</h3>}
            <ul>
                { leagues.map((league: any) => (
                    <li key={league.id}>
                        <Link to={`/admin/leagues/edit?id=${league.id}`}>
                            {league.name}
                        </Link>
                    </li>
                ))}
            </ul>
            {/****************************************************************/}
        </Page>
    );
};

export default LeagueList;