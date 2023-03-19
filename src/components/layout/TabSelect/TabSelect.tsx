import { FC } from 'react';
import { Button } from '../../common';
import './TabSelect.scss';

interface Props {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
}

const TabSelect = ({ selectedTab, setSelectedTab }: Props) => {

  return (
    <div className='tab-select'>
      <Button
        label="Match Overview"
        onClick={() => { setSelectedTab(0) }}
        type={selectedTab === 0 ? 'primary' : 'transparent'}

      />
      <Button
        label="Match Statistics"
        onClick={() => { setSelectedTab(1) }}
        type={selectedTab === 1 ? 'primary' : 'transparent'}
      />
      <Button
        label="Game Leaders"
        onClick={() => { setSelectedTab(2) }}
        type={selectedTab === 2 ? 'primary' : 'transparent'}
      />
    </div>
  );
};

export default TabSelect
