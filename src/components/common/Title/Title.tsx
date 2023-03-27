import { PropsWithChildren } from 'react';

const Title = ({ children }: PropsWithChildren) => {
  return (
    <div className={'title'}>
      <h1>
        {children}
      </h1>
    </div>
  );
};

export default Title