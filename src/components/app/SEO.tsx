import React from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  /**
   * The title to be rendered in the browser tab.
   */
  title?: string;
}

/**
 * Component used to pass metadata into the html head.
 */
const SEO = ({
  title = "iSports",
}: SEOProps) => {
  return (
    <Helmet>
      <title>{`${title} | iSports`}</title>
    </Helmet>
  );
};

export default SEO;
