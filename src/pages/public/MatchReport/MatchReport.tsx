import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import MatchReportBanner from "./components/MatchReportBanner";

const MatchReport = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        label="QAFL, Round 21"
        onClick={() => navigate("/admin/matches")}
        type="transparent"
        icon="IoChevronBackOutline"
      />
      <MatchReportBanner
        data={{
          leagueName: "AFL Queensland, 2022",
          time: "Saturday, 04 June 2022, 02:00 PM",
          location: "Zupps Aspley Oval / Graham Road 1",
          homeTeamName: "BROADBEACH",
          homeTeamLogo: "/public/broadbeach.png",
          homeTeamScore: 95,
          homeTeamSecondScore: 14.11,
          awayTeamName: "ASPLEY",
          awayTeamLogo: "/public/broadbeach.png",
          awayTeamScore: 67,
          awayTeamSecondScore: 9.13,
        }}
      ></MatchReportBanner>
    </div>
  );
};

export default MatchReport;
