import ScoreDistributionChart from "../../../components/charts/ScoreDistributionChart";
import { useMemo, useState, useEffect } from "react";
import { Footer, Page, TabContainer, TabSelect } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import MatchReportBanner from "./components/MatchReportBanner/MatchReportBanner";
import { Button, Spinner } from "../../../components/common";
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import { useQuery } from "react-query";
import { getStats } from "../../../api/matches";
import MatchReportTable from "../../../components/tables/MatchReportTable";
import "./MatchReport.scss";
import MatchStatistic from "./components/MatchStatistic";
import TeamLeaderTable from "../../../components/tables/TeamLeaderTable";

const MatchReport = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [matchId] = useSearchParamsState("id", "");

  const navigate = useNavigate();

  const checkStatShow = (property: string) => {
    // const property = Object.keys(stat).toString();
    if (
      property === "D" ||
      property === "CLR" ||
      property === "CP" ||
      property === "T"
    ) {
      return true;
    }
    return false;
  };

  // Fetch data
  const { data: stats, isLoading } = useQuery(
    ["aflResultProperties"],
    async () => await getStats(+matchId)
  );

  const _stats = useMemo(
    () =>
      Object.keys(stats?.reports || {}).map((name) => ({
        data: Object.keys(stats?.reports[name] || {}).map(
          (key) =>
            ({
              name: key,
              ...stats?.reports[name][key],
            } as MatchReportTableData)
        ),
        name,
      })),
    [stats]
  );

  const gameLeader = useMemo(() => {
    const homeTeam = stats?.leaders?.home?.reports || {};
    const awayTeam = stats?.leaders?.away?.reports || {};
    return { homeTeam, awayTeam };
  }, [stats]);
  const aflResult = useMemo(() => stats?.teamReports || {}, [stats]);

  const overView = useMemo(
    () => _stats.find((item) => item.name === "Overview"),
    [_stats]
  );
  const otherProps = useMemo(
    () => _stats.filter((item) => item.name !== "Overview"),
    [_stats]
  );

  const renderDisposables = () => {
    return (
      <div className="stat-table">
        <div className="overview">
          <div className="overview__grid">
            {overView && (
              <>
                <MatchReportTable
                  parentName={overView?.name}
                  data={overView?.data}
                />
                <ScoreDistributionChart data={overView?.data} />
              </>
            )}
          </div>
        </div>

        <div className="other-props">
          <div className="other-props__grid">
            {otherProps &&
              otherProps.map((item) => (
                <MatchReportTable parentName={item.name} data={item.data} />
              ))}
          </div>
        </div>
      </div>
    );
  };
  const renderGameLeader = () => {
    return (
      <>
        <div className="leader">
          <div className="team-side">
            <div className="home-side-banner">Home</div>
            <div className="away-side-banner">Away</div>
          </div>
          <div className="result-table">
            <div className="home-side">
              {Object.keys(gameLeader.homeTeam).map((key) => {
                if (checkStatShow(key))
                  return (
                    <TeamLeaderTable
                      property={key}
                      data={gameLeader.homeTeam[key]}
                    />
                  );
              })}
            </div>
            <div className="away-side">
              {Object.keys(gameLeader.awayTeam).map((key) => {
                if (checkStatShow(key))
                  return (
                    <TeamLeaderTable
                      property={key}
                      data={gameLeader.awayTeam[key]}
                    />
                  );
              })}
            </div>
          </div>
        </div>
      </>
    );
  };

  if (isLoading) return <Spinner size="large" />;
  if (!isLoading && !stats) return <p>No Statistics found</p>;
  return (
    <>
      <Page title="Match Report">
        <Button
          label="Back"
          onClick={() => navigate(-1)}
          type="transparent"
          icon="IoChevronBackOutline"
        />
        <MatchReportBanner matchId={+matchId} score={aflResult} />
        <TabSelect
          tabs={["Match Overview", "Match Statistics", "Game Leaders"]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div>
          <TabContainer selected={selectedTab === 0}>
            {!!matchId ? (
              renderDisposables()
            ) : (
              <p>Please select match from previous page.</p>
            )}
          </TabContainer>
          <TabContainer selected={selectedTab === 1}>
            {!!matchId && !!stats?.teamReports ? (
              <MatchStatistic
                data={stats?.teamReports}
                isLoading={isLoading}
              ></MatchStatistic>
            ) : (
              <p>Please select match from previous page.</p>
            )}
          </TabContainer>
          <TabContainer selected={selectedTab === 2}>
            {!!matchId ? (
              renderGameLeader()
            ) : (
              <p>Please select match from previous page.</p>
            )}
          </TabContainer>
        </div>
      </Page>
    </>
  );
};

export default MatchReport;
