import "./Container.scss";

type ContainerProps = {
  children: React.ReactNode | React.ReactNode[];
  fullwidth?: boolean;
};

/**
 * Layout component used to keep the web content from exceeding
 * a specied width, and ensuring that it remains centered on the page.
 */
const Container = ({ children }: ContainerProps) => {
  return <div className="container">{children}</div>;
};

export default Container;
