import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import { Row } from "../../../components/layout";

interface PublicNavigationButtonsProps {
  seasonId?: number;
  leagueId?: number;
}

const PublicNavigationButtons = ({
  seasonId,
  leagueId,
}: PublicNavigationButtonsProps) => {
  const navigate = useNavigate();
  return (
    <div className="public-navigation-button">
      {seasonId && (
        <Row noFlex justifyContent="left">
          <Button
            label={`View Fixture`}
            onClick={() =>
              navigate(`/?leagueId=${leagueId}&seasonId=${seasonId}`)
            }
            size="small"
            icon="IoInformationCircleOutline"
            type="secondary"
          />
          <Button
            label={`View Averages`}
            onClick={() =>
              navigate(`/team-stats?leagueId=${leagueId}&seasonId=${seasonId}`)
            }
            size="small"
            icon="IoTrendingUpSharp"
            type="secondary"
          />
          <Button
            label={`View Leaderboard`}
            onClick={() =>
              navigate(`/leaderboard?leagueId=${leagueId}&seasonId=${seasonId}`)
            }
            size="small"
            icon="IoTrophy"
            type="secondary"
          />
        </Row>
      )}
    </div>
  );
};

export default PublicNavigationButtons;
