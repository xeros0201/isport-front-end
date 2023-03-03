import { Page, Row } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getSeasons } from "../../../api/seasons";
import { TextInput } from "../../../components/input";
import { SeasonTable } from "../../../components/tables";

const SeasonList = () => {
    const [query, setQuery] = useState('');

    // Fetch data
    const { isLoading, data: seasons } = useQuery(
        ["getSeasons"], async () => await getSeasons()
    );

    // Filter data to match query  
    const filteredSeasons = useMemo(() => {
        if (!seasons) return [];
        return seasons.filter((league: any) => league.name.toLowerCase().includes(query.toLowerCase()));
    }, [seasons, query]);

    const navigate = useNavigate();

    return (
        <Page title="Seasons">
            <Row alignItems='center' disableWrapping noFlex>
                <h1>Seasons</h1>
                <Button
                    label="New Season"
                    onClick={() => navigate('/admin/seasons/new')}
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
            <SeasonTable data={filteredSeasons} isLoading={isLoading} />
        </Page>
    );
};

export default SeasonList;