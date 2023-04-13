import React from "react";
import MatchStatisticTable from "../../../../../components/tables/MatchStatisticTable";
import "./MatchStatistic.scss";

function MatchStatistic({
  data,
  isLoading,
}: {
  data: AflResult;
  isLoading: boolean;
}) {
  return (
    <div className="match-statistic">
      <div className="match-statistic-table">
        <MatchStatisticTable
          isLoading={isLoading}
          data={data.home}
          type="home"
        ></MatchStatisticTable>
      </div>
      <div className="match-statistic-table">
        <MatchStatisticTable
          isLoading={isLoading}
          data={data.away}
          type="away"
        ></MatchStatisticTable>
      </div>
    </div>
  );
}

export default MatchStatistic;
