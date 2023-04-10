import { AiOutlineCalendar } from "react-icons/ai";
import { GiTrophyCup } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useQuery } from "react-query";
import { getMatchById } from "../../../../../api/matches";
import { useEffect, useState } from "react";
import "./MatchReportBanner.scss";
import { Spinner } from "../../../../../components/common";
import { DateTime } from "luxon";

interface BannerProps {
  matchId: number;
  score: AflResult;
}

interface MatchReportBannerProps {
  leagueName: string;
  time: string;
  location: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeTeamScore: number;
  homeTeamSecondScore: number;
  awayTeamScore: number;
  awayTeamSecondScore: number;
}

function MatchReportBanner({ matchId, score }: BannerProps) {
  // Fetch data
  const {
    isLoading,
    data: match,
    refetch,
  } = useQuery(["match"], async () => await getMatchById(+matchId));

  const [bannerData, setBannerData] = useState({} as MatchReportBannerProps);

  // Fetch as soon as a matchId is provided on the url
  useEffect(() => {
    if (!matchId) return;
    refetch();
    setBannerData({
      ...bannerData,
      leagueName: match?.season.league.name || "",
      time: DateTime.fromISO(match?.date as string).toLocaleString(
        DateTime.DATETIME_MED_WITH_WEEKDAY
      ),
      location: match?.location.name || "",
      homeTeamName: match?.homeTeam.name || "",
      homeTeamLogo: match?.homeTeam.logo || "",
      homeTeamScore: score?.home?.scorePrimary || 0,
      homeTeamSecondScore: score?.home?.secondaryScore || 0,
      awayTeamName: match?.awayTeam.name || "",
      awayTeamLogo: match?.awayTeam.logo || "",
      awayTeamScore: score?.away?.scorePrimary || 0,
      awayTeamSecondScore: score?.away?.secondaryScore || 0,
    });
  }, [matchId, match]);

  // If fetching data for provided id, show loading
  if (matchId && isLoading) return <Spinner />;

  return (
    <div className="match-report-banner">
      <div className="match-report-banner--header">
        <h2>Match Report</h2>
        <div className="detail">
          {[
            {
              label: bannerData.leagueName,
              icon: <GiTrophyCup />,
            },
            {
              label: bannerData.time,
              icon: <AiOutlineCalendar />,
            },
            {
              label: bannerData.location,
              icon: <HiOutlineLocationMarker />,
            },
          ].map((item) => {
            const { icon, label } = item;
            return (
              <div className="detail-item">
                <div className="icon">{icon}</div>
                <span className="detail-item--label">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="match-report-banner--body">
        {[
          {
            name: bannerData.homeTeamName,
            team: "HOME",
            logo: bannerData.homeTeamLogo,
            score: bannerData.homeTeamScore,
            secondScore: bannerData.homeTeamSecondScore,
          },
          {
            name: bannerData.awayTeamName,
            team: "AWAY",
            logo: bannerData.awayTeamLogo,
            score: bannerData.awayTeamScore,
            secondScore: bannerData.awayTeamSecondScore,
          },
        ].map((item, index) => {
          const { name, team, logo, score, secondScore } = item;
          return (
            <div className="team-score" style={{ order: index * 10 }}>
              <div className="team-score--name">
                <p className="team-name">{name}</p>
                <p className="team-type">{team}</p>
              </div>
              <div className="team-score--logo">
                <img src={logo} alt="" />
              </div>
              <div>
                <p className="team-score--score">{score}</p>
                <p className="team-score--secondScore">{secondScore}</p>
              </div>
            </div>
          );
        })}
        <div className="league">
          <div className="league--logo">
            <img src="/public/league-logo.png" alt="" />
          </div>
          <div className="league--matchname">Grand Final</div>
        </div>
      </div>
    </div>
  );
}

export default MatchReportBanner;
