import ScoreDistributionChart from "../../../components/charts/ScoreDistributionChart";
import { useEffect, useState } from "react";
import { Page, Row, TabContainer, TabSelect } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import MatchReportBanner from "./components/MatchReportBanner/MatchReportBanner";
import { Button } from "../../../components/common";
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import { useQuery } from "react-query";
import { getStats } from "../../../api/matches";
import MatchReportTable from "../../../components/tables/MatchReportTable";
import "./MatchReport.scss";

const MatchReport = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [matchId, setmatchId] = useSearchParamsState("id", "");
  const [isMatchIdProvided, setIsMatchIdProvided] = useState(false);
  const [overView, setOverView] = useState([] as ReportOnMatches[]);
  const [otherProps, setOtherProps] = useState([] as ReportOnMatches[][]);

  const navigate = useNavigate();

  // Fetch data
  const { isLoading, data: stats, refetch } = useQuery(
    ["aflResultProperties"], async () => await getStats(+matchId)
  );

  // Fetch as soon as a matchId is provided on the url
  useEffect(() => {
    if (!matchId) return;
    setIsMatchIdProvided(true);
    refetch();
    if(stats) {
      //set data overView prop
      const _overView = stats.reports["Overview"];
      setOverView(_overView);
  
      let _otherProps: ReportOnMatches[][] = [];

      for (const [key, value] of Object.entries(stats.reports)) {
        if (key !== "Overview") {
          _otherProps = [..._otherProps, value];
        }
      }

      setOtherProps(_otherProps);
    }
  }, [matchId, stats]);

  const renderDisposables = () => {
    return (
      <div className="stat-table">

        <div className="overview">
          <div className="overview__grid">
            <MatchReportTable parentName={"Overview"} data={overView} />
                <ScoreDistributionChart
                  data={overView}
                />
          </div>
        </div>

        <div className="other-props">
          <div className="other-props__grid">
            {
              otherProps && otherProps.map((item) => 
              <MatchReportTable 
                parentName={item[0].resultProperty.parent.name} 
                data={item}
              />
            )}
          </div>
        </div>
        
      </div>
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
          {
            isMatchIdProvided ? renderDisposables() : <p>Please select match from previous page.</p>
          }
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
