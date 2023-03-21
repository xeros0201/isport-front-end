import { useState } from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import TeamForm from "../../../components/forms/TeamForm";
import DateInput from "../../../components/input/DateInput/DateInput";
import { Page, TabContainer, TabSelect } from "../../../components/layout";

const MatchReport = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Page title="Match Report">
      <h1>Match Report</h1>
      <TabSelect selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <TabContainer selected={selectedTab === 0}>
          Tab 0
        </TabContainer>
        <TabContainer selected={selectedTab === 1}>
          Tab 1
        </TabContainer>
        <TabContainer selected={selectedTab === 2}>
          Tab 2
        </TabContainer>
      </div>
    </Page>
  );
};

export default MatchReport;
