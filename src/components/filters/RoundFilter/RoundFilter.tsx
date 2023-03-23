import { Logo } from "../../common";
import { LeagueDropdown, RoundDropdown, SeasonDropdown } from "../../dropdowns";
import { Row } from "../../layout";
import "./RoundFilter.scss";
import { RoundInput } from "../../input";

interface RoundFilterProps {
  leagueId: string;
  seasonId: string;
  round: string;
  onLeagueChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
  onRoundChange: (value: string) => void;
  dropdown?: boolean
}

const RoundFilter = ({
  leagueId,
  seasonId,
  round,
  onLeagueChange,
  onSeasonChange,
  onRoundChange,
  dropdown
}: RoundFilterProps) => {

  return (
    <div className="roundfilter">
      <Row alignItems='center' noFlex>
        <Logo url="/league-logo.png" label="Round 21 - 2022" />
        <Row noFlex removeSpacing>
          <LeagueDropdown
            value={leagueId}
            onChange={onLeagueChange}
          />
          <SeasonDropdown
            leagueId={leagueId}
            value={seasonId}
            onChange={onSeasonChange}
          />
          {dropdown
            && <RoundDropdown
              onChange={onRoundChange}
              seasonId={seasonId}
              value={round}
            />
          }
        </Row>
      </Row>
      {!dropdown
        && <RoundInput
          onChange={onRoundChange}
          seasonId={seasonId}
          value={round}
        />
      }
    </div>
  );
};

export default RoundFilter;