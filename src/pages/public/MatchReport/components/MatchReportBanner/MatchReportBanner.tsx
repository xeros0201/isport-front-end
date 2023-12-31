import { AiOutlineCalendar } from "react-icons/ai";
import { GiTrophyCup } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useQuery } from "react-query";
import { getMatchById } from "../../../../../api/matches";
import { useEffect, useState } from "react";
import "./MatchReportBanner.scss";
import { Logo, Spinner } from "../../../../../components/common";
import { DateTime } from "luxon";
const s3URL = import.meta.env.VITE_S3_URL;

interface BannerProps {
  matchId: number;
  score: AflResult;
}

interface MatchReportBannerProps {
  leagueLogo: string;
  leagueName: string;
  time: string;
  location: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeTeamScore: number;
  homeTeamSecondScore: string;
  awayTeamScore: number;
  awayTeamSecondScore: string;
  matchType: string;
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
    const logoUrl = match?.season.league.logo;
    const homeTeamLogo = match?.homeTeam.logo;
    const awayTeamLogo = match?.awayTeam.logo;
    const _matchType : string = match?.type;
    const matchType = _matchType?.replace("_", " ") || "";

    setBannerData({
      ...bannerData,
      matchType,
      leagueLogo: logoUrl ? `${s3URL}/images/${logoUrl}` : "/league-logo.png",
      leagueName: match?.season.league.name || "",
      time: DateTime.fromISO(match?.date as string).toUTC().toLocaleString(
        DateTime.DATETIME_MED_WITH_WEEKDAY
      ),
      location: match?.location.name || "",
      homeTeamName: match?.homeTeam.name || "",
      homeTeamLogo: homeTeamLogo
        ? `${s3URL}/images/${homeTeamLogo}`
        : "/league-logo.png",
      homeTeamScore: score?.home?.score || 0,
      homeTeamSecondScore: `${score?.home?.meta.TOTAL_GOAL}.${
        score?.home?.meta.TOTAL_BEHIND + score?.home?.meta.RUSHED
      }`,
      awayTeamName: match?.awayTeam.name || "",
      awayTeamLogo: awayTeamLogo
        ? `${s3URL}/images/${awayTeamLogo}`
        : "/league-logo.png",
      awayTeamScore: score?.away?.score || 0,
      awayTeamSecondScore: `${score?.away?.meta.TOTAL_GOAL}.${
        score?.away?.meta.TOTAL_BEHIND + score?.away?.meta.RUSHED
      }`,
    });
  }, [matchId, match, score]);

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
                <Logo isSquare height={80} url={logo} alt="" />
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
            <Logo url={bannerData.leagueLogo} />
          </div>
          <div className="league--matchname">{bannerData.matchType}</div>
        </div>
      </div>
    </div>
  );
}

export default MatchReportBanner;
