import { Page, Row } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import TeamTable from "../../../components/tables/TeamTable";
import { TextInput } from "../../../components/input";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getTeams } from "../../../api/teams";

const TeamList = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    // Fetch data
    const { isLoading, data: teams } = useQuery(
        ["getTeams"], async () => await getTeams()
    );

    // Filter data to match query  
    const filteredTeams = useMemo(() => {
        if (!teams) return [];
        return teams.filter((team: Team) => team.name.toLowerCase().includes(query.toLowerCase()));
    }, [teams, query]);

    return (
        <Page title="Teams">
            <Row alignItems='center' disableWrapping noFlex>
                <h1>Teams</h1>
                <Button
                    label="New Team"
                    onClick={() => navigate('/admin/teams/new')}
                    icon="IoAdd"
                />
            </Row>
            <Row>
                <TextInput
                    placeholder="Search..."
                    value={query}
                    onChange={setQuery}
                    icon="IoSearch"
                    rounded
                />
            </Row>
            <TeamTable data={filteredTeams} isLoading={isLoading} />
        </Page>
    );
};

export default TeamList;