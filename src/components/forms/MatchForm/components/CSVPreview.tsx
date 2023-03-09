import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getTeamPlayers } from "../../../../api/teams";
import CSVDropdown from "./CSVDropdown";

interface CSVPreviewProps {
  /**
   * The options to be displayed to the user.
   */
  data: CSVRow[];
  teamId: string | undefined;
}

function CSVPreview({ data, teamId }: CSVPreviewProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<{
    [key: string]: string | undefined;
  }>({});

  // fetch all players in selected team
  const {
    isLoading,
    data: players,
    refetch,
    error,
  } = useQuery(["getTeamPlayer", { teamId }], async () => {
    if (teamId) return getTeamPlayers(teamId);
  });

  // initiate or reset selectedPlayers
  useEffect(() => {
    const refPlayers: { [key: string]: Player } =
      players?.reduce(
        (obj, item) => ({ ...obj, [item.playerNumber]: item }),
        {}
      ) || {};
    const _selectedPlayers = Object.values(data || {}).reduce((obj, item) => {
      const { Code } = item;
      const _code = Code.split(" ")[0];

      const playerNumber = +_code.slice(1);
      return {
        ...obj,
        [item.Code]: refPlayers[playerNumber]?.id.toString() || undefined,
      };
    }, {});

    setSelectedPlayers(_selectedPlayers);
  }, [data, players]);

  // generate list codes
  const arrCodes = useMemo(
    () => Object.keys(selectedPlayers),
    [selectedPlayers]
  );

  return (
    <table width={"100%"}>
      <tbody>
        {arrCodes.map((code) => {
          return (
            <tr key={code}>
              <td width={"1%"}>
                <div className="preview__team--id"> {code}</div>
              </td>
              <td width={"auto"}>
                <CSVDropdown
                  label="Location"
                  value={selectedPlayers[code]}
                  onChange={(id) =>
                    setSelectedPlayers((val) => ({
                      ...val,
                      [code]: id,
                    }))
                  }
                  required
                  asInput
                  data={players?.filter((item) => {
                    if (
                      selectedPlayers[code] !== item.id.toString() &&
                      Object.values(selectedPlayers).includes(
                        item.id.toString()
                      )
                    )
                      return false;
                    return true;
                  })}
                />
              </td>
              <td width={"1%"}>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPlayers((val) => {
                      return { ...val, [code]: undefined };
                    })
                  }
                >
                  x
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CSVPreview;
