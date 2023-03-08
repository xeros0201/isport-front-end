import { useState } from "react";
import { RoundFilter } from "../../../components/filters";
import { RoundFilterType } from "../../../components/filters/RoundFilter/RoundFilter";
import { Page } from "../../../components/layout";

const TeamStats = () => {
    const [filter, setFilter] = useState<RoundFilterType>({
      leagueId: "",
      seasonId: "",
      round: "",
    });

    return (
        <Page title="Team Stats">
            <RoundFilter onChange={setFilter} />
            <h1>Team Stats</h1>
        </Page>
    );
};

export default TeamStats;