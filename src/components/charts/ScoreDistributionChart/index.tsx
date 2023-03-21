import React from "react";
import "./ScoreDistributionChart.scss";

interface ScoreDistributionChartProps {
  data: ScoreDistribution[];
  isLoading?: boolean;
}
function ScoreDistributionChart({
  data,
  isLoading = false,
}: ScoreDistributionChartProps) {
  return (
    <div className="score-distribution-wrapper">
      <div className="score-distribution">
        <div className="line-wrapper">
          {[...Array(11).keys()].map((item) => {
            return (
              <div className="line">
                <span>{item * 10}%</span>
              </div>
            );
          })}
        </div>
        {data.map((item) => {
          const { name, homeScore, awayScore } = item;
          const percent = (homeScore / (homeScore + awayScore)) * 100;
          return (
            <div className="score-distribution-row">
              <div className="score-distribution-row--name">{item.name}</div>
              <div className="score-distribution-row--score">
                {item.awayScore}
                <div className="score-fill" style={{ width: `${percent}%` }}>
                  {item.homeScore}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="legend">
        {[
          {
            name: "Home",
            color: "#F8E12F",
          },
          {
            name: "Away",
            color: "#C92A7A",
          },
        ].map((item) => {
          return (
            <div className="legend-item">
              <div className="rect" style={{ background: item.color }}></div>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScoreDistributionChart;
