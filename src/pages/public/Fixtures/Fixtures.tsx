import { useState } from "react";
import { RoundFilter } from "../../../components/filters";
import { Page, TabContainer, TabSelect } from "../../../components/layout";
import useSearchParamsState from "../../../hooks/useSearchParamsState";

const Fixtures = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [round, setRound] = useSearchParamsState("round", "");

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Page title="Fixtures">
      <RoundFilter
        leagueId={leagueId}
        onLeagueChange={setLeagueId}
        seasonId={seasonId}
        onSeasonChange={setSeasonId}
        round={round}
        onRoundChange={setRound}
      />
      <h1>Fixtures</h1>
      <TabSelect selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <TabContainer selected={selectedTab === 0}>
          Tab 0
        </TabContainer>
        <TabContainer selected={selectedTab === 1}>
          Tab 1
        </TabContainer>
        <TabContainer selected={selectedTab === 2}>
          Tab 2
        </TabContainer>
      </div>
    </Page>
  );
};

export default Fixtures;
