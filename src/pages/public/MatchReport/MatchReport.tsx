import ScoreDistributionChart from "../../../components/charts/ScoreDistributionChart";
import { useState } from "react";
import { Page, TabContainer, TabSelect } from "../../../components/layout";

const MatchReport = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Page title="Match Report">
      <h1>Match Report</h1>
      <TabSelect selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <TabContainer selected={selectedTab === 0}>
        <ScoreDistributionChart
          data={[
            {
              name: "Diposables",
              homeScore: 100,
              awayScore: 223,
            },
            {
              name: "Kicks",
              homeScore: 178,
              awayScore: 223,
            },
            {
              name: "Handballs",
              homeScore: 200,
              awayScore: 223,
            },
          ]}
        ></ScoreDistributionChart>
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

export default MatchReport;
