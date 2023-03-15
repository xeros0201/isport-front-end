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
}

const Row = ({ children, alignItems, removeSpacing, noFlex, disableWrapping }: RowProps) => {
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
        return <div className="row__item">{child}</div>;
      })}
    </div>
  );
};

export default Row;
