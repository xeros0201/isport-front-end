import "./Row.scss";
import React, { CSSProperties } from "react";
import classNames from "classnames";

interface RowProps {
  /**
   * Each child will be a row item in the row.
   * Space between each item is automatically applied.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * How the items should be aligned vertically.
   */
  alignItems?: CSSProperties["alignContent"];
  /**
   * Removes spacing between elements in the row
   */
  removeSpacing?: boolean;
  /**
   * Set row items to have a flex value of 0
   */
  noFlex?: boolean;
  /**
   * Prevents the rows from wrapping on smaller screens.
   */
  disableWrapping?: boolean;
    /**
   * default is 0 if no specified configuration for each row item => no need wrapping each row item in a `RowItem` component
   * value is 1 if there is specified configuration for each row item => need wrapping each row item in a `RowItem` component
   */
    isWrapRowItem?: boolean;
}

const Row = ({ children, alignItems, removeSpacing, noFlex, disableWrapping, isWrapRowItem = false}: RowProps) => {
  /**
   * Convert the children to an array to make them
   * easier to work with.
   */
  const childrenArray = React.Children.toArray(children);
  
  const rowClasses = classNames({
    "row": true,
    "row--nospacing": removeSpacing,
    "row--disallow-wrapping": disableWrapping,
    "row--no-flex": noFlex,
  })

  return (
    <div className={rowClasses} style={{ alignItems }}>
      {childrenArray.map((child) => {
        if (!isWrapRowItem)
          return <div className="row__item" >{child}</div>;
        else
          return <>{child}</>;
      })}
    </div>
  );
};

export default Row;
