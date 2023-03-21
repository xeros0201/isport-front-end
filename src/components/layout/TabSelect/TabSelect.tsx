import { Button } from '../../common';
import './TabSelect.scss';

interface TabSelectProps {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
  tabs: string[];
}

const TabSelect = ({ selectedTab, setSelectedTab, tabs }: TabSelectProps) => {

  return (
    <div className='tab-select'>
      {tabs.map((tab, index) => {
        return (
          <Button
            key={index}
            label={tab}
            onClick={() => { setSelectedTab(index) }}
            type={selectedTab === index ? 'primary' : 'transparent'}
          />
        )
      })
      }
    </div>
  );
};

export default TabSelect
