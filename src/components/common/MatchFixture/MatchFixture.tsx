import { useNavigate } from "react-router";
import { DateTime } from "luxon";
import { Row } from "../../layout";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";
import "./MatchFixture.scss";
const s3URL = import.meta.env.VITE_S3_URL;

interface MatchFixtureProps {
  matchFixture: Match;
}

const MatchFixtures = ({ matchFixture }: MatchFixtureProps) => {
  const navigate = useNavigate();

  const homeTeamReport = matchFixture.teamReports.find(
    (result) => result.teamId == matchFixture.homeTeamId
  );
  const awayTeamReport = matchFixture.teamReports.find(
    (result) => result.teamId == matchFixture.awayTeamId
  );

  const homeTeamScorePrimary = homeTeamReport?.score || 0;
  const awayTeamScorePrimary = awayTeamReport?.score || 0;

  const time = matchFixture.date
    ? DateTime.fromISO(matchFixture.date).toLocaleString(DateTime.TIME_SIMPLE)
    : "-- : --";

  const isTeamWinner = (teamName?: string): boolean => {
    if (homeTeamScorePrimary && awayTeamScorePrimary) {
      if (
        homeTeamScorePrimary > awayTeamScorePrimary &&
        matchFixture.homeTeam?.name == teamName
      ) {
        return true;
      } else if (
        homeTeamScorePrimary < awayTeamScorePrimary &&
        matchFixture.awayTeam?.name == teamName
      ) {
        return true;
      }
    }

    return false;
  };

  const isWinner = (teamName?: string): string =>
    `score--${isTeamWinner(teamName) ? "winner" : "loser"}`;

  return (
    <div className="match-fixture">
      <Row alignItems="center" noFlex>
        {/* Home Team */}
        <Row
          alignItems="center"
          justifyContent="flex-start"
          disableWrapping
          noFlex
        >
          <Logo
            url={
              matchFixture.homeTeam?.logo
                ? `${s3URL}/image/${matchFixture.homeTeam?.logo}`
                : "/league-logo.png"
            }
          />
          <div className={`score ${isWinner(matchFixture.homeTeam?.name)}`}>
            {matchFixture.homeTeam?.name}
          </div>

          <div className={`score ${isWinner(matchFixture.homeTeam?.name)}`}>
            {homeTeamReport?.score} ({homeTeamReport?.meta.TOTAL_GOAL}.
            {homeTeamReport?.meta.TOTAL_BEHIND})
          </div>
        </Row>

        {/* Away Team */}
        <Row
          alignItems="center"
          justifyContent="flex-start"
          disableWrapping
          noFlex
        >
          <Logo
            url={
              matchFixture.awayTeam?.logo
                ? `${s3URL}/image/${matchFixture.awayTeam?.logo}`
                : "/league-logo.png"
            }
          />

          <div className={`score ${isWinner(matchFixture.awayTeam?.name)}`}>
            {matchFixture.awayTeam?.name}
          </div>

          <div className={`score ${isWinner(matchFixture.awayTeam?.name)}`}>
            {awayTeamReport?.score} ({awayTeamReport?.meta.TOTAL_GOAL}.
            {awayTeamReport?.meta.TOTAL_BEHIND})
          </div>
        </Row>

        {/* Other info */}
        <div className="time">
          <Icon className="time__icon" name="IoTimeOutline" />
          <div className="time__info">{time}</div>
        </div>

        <div className="location">
          <Icon className="location__icon" name="IoLocationOutline" />
          <div className="location__info">{matchFixture.location?.name}</div>
        </div>

        {/* Action */}
        <Button
          label="Match Report"
          type="outlined"
          size="small"
          onClick={() => navigate(`/match-report?id=${matchFixture.id}`)}
        />
      </Row>
    </div>
  );
};

export default MatchFixtures;
