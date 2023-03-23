import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import './Title.scss'

interface Props extends PropsWithChildren {
  loginForm?: boolean
}

const Title = ({ children, loginForm = false }: Props) => {

  return (
    <div className={classNames({
      'title': true,
      'title--login': loginForm
    })}>
      <h1>
        {children}
      </h1>
    </div>
  );
};

export default Title