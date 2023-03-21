import ScoreDistributionChart from "../../../components/charts/ScoreDistributionChart";
import { useState } from "react";
import { Page, TabContainer, TabSelect } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import MatchReportBanner from "./components/MatchReportBanner/MatchReportBanner";
import { Button } from "../../../components/common";

const MatchReport = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  const renderDisposables = () => {
    return (
      <ScoreDistributionChart
          data={[
            {
              name: "Disposables",
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
        />
    );
  }


  return (
    <Page title="Match Report">
      <Button
        label="QAFL, Round 21"
        onClick={() => navigate(-1)}
        type="transparent"
        icon="IoChevronBackOutline"
      />
      <MatchReportBanner
        data={{
          leagueName: "AFL Queensland, 2022",
          time: "Saturday, 04 June 2022, 02:00 PM",
          location: "Zupps Aspley Oval / Graham Road 1",
          homeTeamName: "BROADBEACH",
          homeTeamLogo: "/public/broadbeach.png",
          homeTeamScore: 95,
          homeTeamSecondScore: 14.11,
          awayTeamName: "ASPLEY",
          awayTeamLogo: "/public/broadbeach.png",
          awayTeamScore: 67,
          awayTeamSecondScore: 9.13,
        }}
      ></MatchReportBanner>
      <TabSelect
        tabs={["Match Overview", "Match Statistics", "Game Leaders"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div>
        <TabContainer selected={selectedTab === 0}>
          {renderDisposables()}
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
