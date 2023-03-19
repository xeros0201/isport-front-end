import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import './TabContainer.scss'

interface Props extends PropsWithChildren {
  selected: boolean
}

const TabContainer = ({ selected, children }: Props) => {

  return (
    <div
      className={classNames({
        'tab-container': true,
        'tab-container--selected': selected
      })}
    >
      {children}
    </div>
  );
};

export default TabContainer
