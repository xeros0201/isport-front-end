import { useNavigate } from "react-router";
import { Row } from "../../layout";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";
import "./MatchFixture.scss";
import { DateTime } from "luxon";

interface MatchFixtureProps {
    matchFixture: Match
}

const MatchFixtures = ({matchFixture} : MatchFixtureProps) => {
    const navigate = useNavigate();

    const homeTeamScorePrimary = matchFixture.aflResults.find(result => result.teamId == matchFixture.homeTeam.id)?.scorePrimary;
    const homeTeamScoreSecondary = matchFixture.aflResults.find(result => result.teamId == matchFixture.homeTeam.id)?.scoreSecondary;

    const awayTeamScorePrimary = matchFixture.aflResults.find(result => result.teamId == matchFixture.awayTeam.id)?.scorePrimary;
    const awayTeamScoreSecondary = matchFixture.aflResults.find(result => result.teamId == matchFixture.awayTeam.id)?.scoreSecondary;

    const time = DateTime.fromISO(matchFixture.date).toLocaleString(DateTime.TIME_SIMPLE)

    const isTeamWinner = (teamName: string) : boolean => {
        if(homeTeamScorePrimary && awayTeamScorePrimary) {
            if(homeTeamScorePrimary > awayTeamScorePrimary && matchFixture.homeTeam.name == teamName)
                return true;
            else if(homeTeamScorePrimary < awayTeamScorePrimary && matchFixture.awayTeam.name == teamName)
                return true;
        }
        return false;
    }

    const isWinner = (teamName: string) : string => `score--${isTeamWinner(teamName) ? "winner" : "loser"}`;

    return (
        <div className="match-fixture">
            <Row alignItems="center" noFlex>
                {/* Home Team */}
                <Row alignItems="center" justifyContent="flex-start" disableWrapping noFlex>
                    <Logo url={`${matchFixture.homeTeam.logo}`}/>
                    
                    <div className={`score ${isWinner(matchFixture.homeTeam.name)}`}>
                        {matchFixture.homeTeam.name}
                    </div>
                
                    <div className={`score ${isWinner(matchFixture.homeTeam.name)}`}>
                        {`${homeTeamScorePrimary} (${homeTeamScoreSecondary})`}
                    </div>
                </Row>
                

                {/* Away Team */}
                <Row alignItems="center" justifyContent="flex-start" disableWrapping noFlex>
                    <Logo url={`${matchFixture.awayTeam.logo}`}/>
                    
                    <div className={`score ${isWinner(matchFixture.awayTeam.name)}`}>
                        {matchFixture.awayTeam.name}
                    </div>
                
                    <div className={`score ${isWinner(matchFixture.awayTeam.name)}`}>
                        {`${awayTeamScorePrimary} (${awayTeamScoreSecondary})`}
                    </div>
                </Row>
                
                {/* Other info */}
                <div className="time" >
                    <Icon className="time__icon" name="IoTimeOutline" />
                    <div className="time__info">{time}</div>
                </div>
                
                <div className="location" >
                    <Icon className="location__icon" name="IoLocationOutline" />
                    <div className="location__info">{matchFixture.location.name}</div>
                </div>
                
                {/* Action */}
                <Button
                    label="Match Report"
                    type="outlined"
                    size="small"
                    onClick={() => navigate(`/match-report`)}
                />
            </Row>
        </div>
    )
}

export default MatchFixtures;