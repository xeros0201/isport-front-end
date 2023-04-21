import { useNavigate } from "react-router-dom";
import { Button } from "..";
import { Row } from "../../layout";

interface PublicNavigationButtonsProps {
    currentPage: string;
    seasonId?: number;
    leagueId?: number;
}

const PublicNavigationButtons = ({
    currentPage,
    seasonId,
    leagueId,
}: PublicNavigationButtonsProps) => {
  const navigate = useNavigate();
  return (
    <div className="public-navigation-button">
      {seasonId ? (
        <Row noFlex justifyContent="left">
          {currentPage !== "fixtures" && <Button
            label={`View Fixtures`}
            onClick={() =>
              navigate(`/?leagueId=${leagueId}&seasonId=${seasonId}`)
            }
            size="small"
            icon="IoInformationCircleOutline"
            type="secondary"
          />}
          {currentPage !== "averages" && <Button
            label={`View Averages`}
            onClick={() =>
              navigate(`/team-stats?leagueId=${leagueId}&seasonId=${seasonId}`)
            }
            size="small"
            icon="IoTrendingUpSharp"
            type="secondary"
          />}
          {currentPage !== "leaderboard" && <Button
            label={`View Leaderboard`}
            onClick={() =>
              navigate(`/leaderboard?leagueId=${leagueId}&seasonId=${seasonId}`)
            }
            size="small"
            icon="IoTrophy"
            type="secondary"
          />}
        </Row>
      ) : <></>}
    </div>
  );
};

export default PublicNavigationButtons;
