import { Logo } from "../../common";
import { LeagueDropdown, RoundDropdown, SeasonDropdown } from "../../dropdowns";
import { Row } from "../../layout";
import "./RoundFilter.scss";
import { RoundInput } from "../../input";
import { useQuery } from "react-query";
import { getLeague } from "../../../api/leagues";
import { getSeason } from "../../../api/seasons";
import { useMemo, useState } from "react";
import { getMatchesBySeason } from "../../../api/matches";
const s3URL = import.meta.env.VITE_S3_URL;

interface RoundFilterProps {
  leagueId: string;
  seasonId: string;
  round: string;
  onLeagueChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
  onRoundChange: (value: string) => void;
  dropdown?: boolean;
}

const RoundFilter = ({
  leagueId,
  seasonId,
  round,
  onLeagueChange,
  onSeasonChange,
  onRoundChange,
  dropdown,
}: RoundFilterProps) => {
  const { data: league } = useQuery(["getLeague", leagueId], async () =>
    getLeague(+leagueId)
  );
  const { data: season } = useQuery(["getSeason", seasonId], async () =>
    getSeason(+seasonId)
  );

  return (
    <div className="roundfilter">
      <Row alignItems="center" noFlex>
        <Logo
          url={
            league?.logo
              ? `${s3URL}/images/${league?.logo}`
              : "/league-logo.png"
          }
          label={[round ? `Round ${round}` : "All Rounds", season?.name]
            .filter((item) => !!item)
            .join(" - ")}
        />
        <Row noFlex removeSpacing>
          <LeagueDropdown value={leagueId} onChange={onLeagueChange} />
          <SeasonDropdown
            requireLeague={true}
            leagueId={leagueId}
            value={seasonId}
            onChange={onSeasonChange}
          />
          {dropdown && (
            <RoundDropdown
              onChange={onRoundChange}
              seasonId={seasonId}
              value={round}
            />
          )}
        </Row>
      </Row>
      {!dropdown && (
        <RoundInput
          onChange={onRoundChange}
          seasonId={seasonId}
          value={round}
        />
      )}
    </div>
  );
};

export default RoundFilter;
