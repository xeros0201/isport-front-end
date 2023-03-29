import { Button } from '../../common';
import Row from '../Row/Row';
import './TabSelect.scss';

interface TabSelectProps {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
  tabs: string[];
}

const TabSelect = ({ selectedTab, setSelectedTab, tabs }: TabSelectProps) => {

  return (
    <Row justifyContent="flex-end" noFlex removeSpacing>
      {tabs.map((tab, index) => {
        return (
          <div className='tab-select'>
            <Button
              key={index}
              label={tab}
              onClick={() => { setSelectedTab(index) }}
              type={selectedTab === index ? 'primary' : 'transparent'}
            />
          </div>
        )
      })
      }
    </Row>
  );
};

export default TabSelect
