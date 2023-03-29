import { AiOutlineCalendar } from "react-icons/ai";
import { GiTrophyCup } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import "./MatchReportBanner.scss";

interface MatchReportBannerProps {
  data: {
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
}

function MatchReportBanner({ data }: MatchReportBannerProps) {
  const {
    leagueName,
    time,
    location,
    homeTeamName,
    awayTeamName,
    homeTeamLogo,
    awayTeamLogo,
    homeTeamScore,
    homeTeamSecondScore,
    awayTeamScore,
    awayTeamSecondScore
  } = data;
  
  return (
    <div className="match-report-banner">
      <div className="match-report-banner--header">
        <h2>Match Report</h2>
        <div className="detail">
          {[
            {
              label: leagueName,
              icon: <GiTrophyCup />,
            },
            {
              label: time,
              icon: <AiOutlineCalendar />,
            },
            {
              label: location,
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
            name: homeTeamName,
            team: "HOME",
            logo: homeTeamLogo,
            score: homeTeamScore,
            secondScore: homeTeamSecondScore,
          },
          {
            name: awayTeamName,
            team: "AWAY",
            logo: awayTeamLogo,
            score: awayTeamScore,
            secondScore: awayTeamSecondScore,
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
