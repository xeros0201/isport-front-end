import classNames from "classnames";
import { SEO } from "../../app";
import "./Page.scss";

type PageProps = {
  /**
   * Component used to pass metadata into the html head.
   */
  title: string;
  /**
   * Components to be rendered inside the page.
   */
  children: React.ReactNode | React.ReactNode[];
  fullHeight?: boolean;
};

/**
 * Layout component used to wrap an entire pages content.
 */
const Page = ({ title, children, fullHeight }: PageProps) => {
  return (
    <main className={classNames({
      "page": true,
      "page--fullHeight": fullHeight
    })}>
      <SEO title={title} />
      {children}
    </main>
  );
};

export default Page;
