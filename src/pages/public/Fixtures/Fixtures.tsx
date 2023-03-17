import { useState } from "react";
import { Button } from "../../../components/common";
import { RoundFilter } from "../../../components/filters";
import { Page } from "../../../components/layout";
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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          label="Match Overview"
          onClick={() => { setSelectedTab(0) }}
          type={selectedTab === 0 ? 'primary' : 'transparent'}

        />
        <Button
          label="Match Statistics"
          onClick={() => { setSelectedTab(1) }}
          type={selectedTab === 1 ? 'primary' : 'transparent'}
        />
        <Button
          label="Game Leaders"
          onClick={() => { setSelectedTab(2) }}
          type={selectedTab === 2 ? 'primary' : 'transparent'}
        />
      </div>
      <div>
        <div
          style={{
            borderRadius: '10px',
            boxShadow: '3px 3px grey',
            display: selectedTab === 0 ? 'flex' : 'none',
            border: '1px solid black',
            padding: '2rem',
            marginTop: '1rem'
          }}
        >
          Tab 1
        </div>
        <div
          style={{
            borderRadius: '10px',
            boxShadow: '3px 3px grey',
            display: selectedTab === 1 ? 'flex' : 'none',
            border: '1px solid black',
            padding: '2rem',
            marginTop: '1rem'
          }}
        >
          Tab 2
        </div>
        <div
          style={{
            borderRadius: '10px',
            boxShadow: '3px 3px grey',
            display: selectedTab === 2 ? 'flex' : 'none',
            border: '1px solid black',
            padding: '2rem',
            marginTop: '1rem'
          }}
        >
          Tab 3
        </div>
      </div>
    </Page>
  );
};

export default Fixtures;
