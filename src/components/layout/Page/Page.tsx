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
};

/**
 * Layout component used to wrap an entire pages content.
 */
const Page = ({ title, children }: PageProps) => {
  return (
    <main className="page">
      <SEO title={title} />
      {children}
    </main>
  );
};

export default Page;
