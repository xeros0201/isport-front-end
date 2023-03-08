import { useState } from "react";
import { useLocation } from "react-router-dom";
import { RoundFilter } from "../../../components/filters";
import { RoundFilterType } from "../../../components/filters/RoundFilter/RoundFilter";
import { Page } from "../../../components/layout";


const Fixtures = () => {
  const [filter, setFilter] = useState<RoundFilterType>({
    leagueId: "",
    seasonId: "",
    round: "",
  });

  // Get id from url
  const location = useLocation();
  const leagueId = new URLSearchParams(location.search).get('leagueId');
  const seasonId = new URLSearchParams(location.search).get('seasonId');
  const round = new URLSearchParams(location.search).get('round');

  return (
    <Page title="Fixtures" >
      <RoundFilter onChange={setFilter} />
      <h1>Fixtures</h1>
    </Page>
  );
};

export default Fixtures;
