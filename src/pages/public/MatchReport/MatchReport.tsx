import ScoreDistributionChart from "../../../components/charts/ScoreDistributionChart";

const MatchReport = () => {
  return (
    <div>
      <h1>Match Report</h1>
      <ScoreDistributionChart
        data={[
          {
            name: "Diposables",
            homeScore: 100,
            awayScore: 223,
          },
          {
            name: "Kicks",
            homeScore: 178,
            awayScore: 223,
          },
          {
            name: "Handballs",
            homeScore: 200,
            awayScore: 223,
          },
        ]}
      ></ScoreDistributionChart>
    </div>
  );
};

export default MatchReport;
