import { Page, Row } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getPlayers } from "../../../api/players";
import { TextInput } from "../../../components/input";
import { PlayerTable } from "../../../components/tables";

const PlayerList = () => {
    const [query, setQuery] = useState('');

    // Fetch data
    const { isLoading, data: players } = useQuery(
        ["getPlayers"], async () => await getPlayers()
    );

    // Filter data to match query  
    const filteredPlayers = useMemo(() => {
        if (!players) return [];
        return players.filter((player: any) => player.name.toLowerCase().includes(query.toLowerCase()));
    }, [players, query]);

    const navigate = useNavigate();

    return (
        <Page title="Players">
            <Row alignItems='center' disableWrapping noFlex>
                <h1>Players</h1>
                <Button
                    label="New Player"
                    onClick={() => navigate('/admin/players/new')}
                    icon="IoAdd"
                />
            </Row>
            <TextInput
                placeholder="Search..."
                value={query}
                onChange={setQuery}
                icon="IoSearch"
                rounded
            />
            <PlayerTable data={filteredPlayers} isLoading={isLoading}/>
        </Page>
    );
};

export default PlayerList;