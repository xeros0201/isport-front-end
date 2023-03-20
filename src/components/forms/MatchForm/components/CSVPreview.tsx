import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { deletePlayerOnMatch } from "../../../../api/matches";
import { getTeamPlayers } from "../../../../api/teams";
import CSVDropdown from "./CSVDropdown";

interface CSVPreviewProps {
  /**
   * The options to be displayed to the user.
   */
  playerNumberList?: string[];
  teamId: string | undefined;
  onChange?: (value: { [key: string]: string | undefined }) => void;
  playersOnMatch?: PlayerOnMatch[];
  matchId?: number;
}

function CSVPreview({
  playerNumberList,
  teamId,
  onChange,
  playersOnMatch,
  matchId,
}: CSVPreviewProps) {
  const [playerNumbers, setPlayerNumbers] = useState<string[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<{
    [key: string]: string | undefined;
  }>({});

  useEffect(() => {
    if (playerNumberList) setPlayerNumbers(playerNumberList);
  }, [playerNumberList]);

  useEffect(() => {
    if (playersOnMatch)
      setSelectedPlayers(
        playersOnMatch
          .filter((player) => player.teamId.toString() === teamId)
          .reduce(
            (obj, player) => ({
              ...obj,
              [player.playerNumber as number]: player.playerId.toString(),
            }),
            {}
          )
      );
  }, [playersOnMatch]);

  useEffect(() => {
    if (onChange) onChange(selectedPlayers);
  }, [selectedPlayers]);

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
    if (!playersOnMatch && playerNumberList) {
      const refPlayers: { [key: string]: Player } =
        players?.reduce(
          (obj, item) =>
            item.playerNumber ? { ...obj, [item.playerNumber]: item } : obj,
          {}
        ) || {};
      const _selectedPlayers = playerNumberList.reduce((obj, playerNumber) => {
        return {
          ...obj,
          [playerNumber]: refPlayers[playerNumber]?.id.toString() || undefined,
        };
      }, {});

      setSelectedPlayers(_selectedPlayers);
    }
  }, [playerNumberList, players, playersOnMatch]);

  const handleDeletePlayer = async (playerNumber: string) => {
    setPlayerNumbers((val) => {
      const _val = [...val];
      const index = _val.findIndex((item) => item === playerNumber);
      _val.splice(index, 1);
      return [..._val];
    });
    setSelectedPlayers((val) => {
      delete val[playerNumber];
      return { ...val };
    });
    if (matchId) {
      const playerId = playersOnMatch?.find(
        (item) =>
          item.teamId.toString() === teamId &&
          item.playerNumber?.toString() === playerNumber
      )?.id;
      if (playerId) await deletePlayerOnMatch(matchId, +playerId);
    }
  };

  return (
    <table width={"100%"}>
      <tbody>
        {playerNumbers?.map((playerNumber, index) => {
          return (
            <tr key={playerNumber}>
              <td width={"1%"}>
                <div className="preview__team--id"> {playerNumber}</div>
              </td>
              <td width={"auto"}>
                {!isLoading && (
                  <CSVDropdown
                    value={selectedPlayers[playerNumber]}
                    onChange={(id) =>
                      setSelectedPlayers((val) => {
                        const swapKey = Object.keys(val).find(
                          (key) => val[key] === id
                        );
                        return {
                          ...val,
                          [playerNumber]: id,
                          ...(swapKey
                            ? { [swapKey]: val[playerNumber] || "" }
                            : {}),
                        };
                      })
                    }
                    required
                    asInput
                    data={players}
                  />
                )}
              </td>
              <td width={"1%"}>
                <button
                  type="button"
                  onClick={() => {
                    handleDeletePlayer(playerNumber);
                  }}
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
