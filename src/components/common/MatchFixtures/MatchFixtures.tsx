import { useNavigate } from "react-router";
import { Row } from "../../layout";
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
            <Row alignItems="center" noFlex>
                {/* Home Team */}
                <Row alignItems="center" justifyContent="flex-start" disableWrapping noFlex>
                    <Logo url={`${fixture.awayTeamLogo}`}/>
                    
                    <div className={`score ${isWinner(fixture.homeTeamName)}`}>
                        {fixture.homeTeamName}
                    </div>
                
                    <div className={`score ${isWinner(fixture.homeTeamName)}`}>
                        {`${fixture.homeTeamScorePrimary} (${fixture.homeTeamScoreSecondary})`}
                    </div>
                </Row>
                

                {/* Away Team */}
                <Row alignItems="center" justifyContent="flex-start" disableWrapping noFlex>
                    <Logo url={`${fixture.awayTeamLogo}`}/>
                    
                    <div className={`score ${isWinner(fixture.awayTeamName)}`}>
                        {fixture.awayTeamName}
                    </div>
                
                    <div className={`score ${isWinner(fixture.awayTeamName)}`}>
                        {`${fixture.awayTeamScorePrimary} (${fixture.awayTeamScoreSecondary})`}
                    </div>
                </Row>
                
                {/* Other info */}
                <div className="time" >
                    <Icon className="time__icon" name="IoTimeOutline" />
                    <div className="time__info">{fixture.matchTime}</div>
                </div>
                
                <div className="location" >
                    <Icon className="location__icon" name="IoLocationOutline" />
                    <div className="location__info">{fixture.location}</div>
                </div>
                
                {/* Action */}
                <Button
                    label="Match Report"
                    type="outlined"
                    size="small"
                    onClick={() => navigate(`/admin/match-report`)}
                />
            </Row>
        </div>
    )
}

export default MatchFixtures;