import { Page } from "../../../components/layout";
import { useQuery } from "react-query";
import { getLeagues } from "../../../api/leagues";
import { Link } from "react-router-dom";
import { Spinner } from "../../../components/common";
import { TextInput } from "../../../components/input";
import { useMemo, useState } from "react";

const LeaguesList = () => {
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

    return (
        <Page title="Leagues">
            <h1>Leagues</h1>
            <TextInput
                placeholder="Search..."
                value={query}
                onChange={setQuery}
                rounded
            />
            {/*** This should be rewritten and turned into its own component ***/}
            {isLoading && <Spinner />}
            {!isLoading && !leagues?.length && <h3>No data</h3>}
            {!isLoading && leagues?.length && (
                <ul>
                    { leagues.map((league: any) => (
                        <li key={league.id}>
                            <Link to={`/admin/leagues/edit?id=${league.id}`}>
                                {league.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {/****************************************************************/}
        </Page>
    );
};

export default LeaguesList;