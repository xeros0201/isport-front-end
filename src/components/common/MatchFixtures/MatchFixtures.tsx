import { useNavigate } from "react-router";
import { Row } from "../../layout";
import RowItem from "../../layout/Row/RowItem";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";
import "./MatchFixtures.scss";

interface MatchFixtureProps {
    fixture: MatchFixture,
    isLoading?: boolean,
}

const MatchFixtures = ({
    fixture,
    isLoading = false,
} : MatchFixtureProps) => {
    const navigate = useNavigate();

    const isHomeTeamWinner = (teamName: string) : boolean => {
        if(fixture.homeTeamScorePrimary > fixture.awayTeamScorePrimary && fixture.homeTeamName == teamName)
            return true;
        return false;
    }

    const isWinner = (teamName: string) : string => `score--${isHomeTeamWinner(teamName) ? "winner" : "loser"}`;

    return (
        <div className="match-fixture">
            <Row isWrapRowItem={true} alignItems={"center"}>
                {/* Home Team */}
                <RowItem><Logo url={`${fixture.awayTeamLogo}`}/></RowItem>
                <RowItem>
                    <span className={`score ${isWinner(fixture.homeTeamName)}`}>
                        {fixture.homeTeamName}
                    </span>
                </RowItem>
                <RowItem>
                    <span className={`score ${isWinner(fixture.homeTeamName)}`}>
                        {`${fixture.homeTeamScorePrimary} (${fixture.homeTeamScoreSecondary})`}
                    </span>
                </RowItem>

                {/* Away Team */}
                <RowItem><Logo url={`${fixture.awayTeamLogo}`}/></RowItem>
                <RowItem>
                    <span className={`score ${isWinner(fixture.awayTeamName)}`}>
                        {fixture.awayTeamName}
                    </span>
                </RowItem>
                <RowItem>
                    <span className={`score ${isWinner(fixture.awayTeamName)}`}>
                        {`${fixture.awayTeamScorePrimary} (${fixture.awayTeamScoreSecondary})`}
                    </span>
                </RowItem>

                {/* Other info */}
                <RowItem>
                    <span className="time" >
                        <Icon className="time__icon" name={"IoTimeOutline"} />
                        <span className="time__info">{fixture.matchTime}</span>
                    </span>
                </RowItem>
                <RowItem flexGrow={2}>
                    <span className="location" >
                        <Icon className="location__icon" name={"IoLocationOutline"} />
                        <span className="location__info">{fixture.location}</span>
                    </span>
                </RowItem>

                {/* Action */}
                <RowItem>
                    <Button
                        label="Match Report"
                        type="white"
                        size="small"
                        onClick={() => navigate(`/admin/match-report`)}
                    />
                </RowItem>
            </Row>
        </div>
    )
}

export default MatchFixtures;