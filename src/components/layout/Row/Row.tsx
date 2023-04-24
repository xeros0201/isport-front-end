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
   * How the items should be aligned vertically.
   */
  justifyContent?: CSSProperties["justifyContent"];
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
   * default value is true if no need to set width ratio for each row item
   * value is false if need to set width ratio each row item
   */
    isWrapRowItem?: boolean;

    rowName?: string;
}

const Row = ({
    children,
    alignItems,
    justifyContent,
    removeSpacing,
    noFlex,
    disableWrapping,
    isWrapRowItem = true,
    rowName,
  }: RowProps) => {
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
    [`${rowName}`]: true,
  })

  return (
    <div className={rowClasses} style={{ alignItems, justifyContent }}>
      {childrenArray.map((child) => {
        if (isWrapRowItem)
          return <div className="row__item" >{child}</div>;
        else
          return <>{child}</>;
      })}
    </div>
  );
};

export default Row;
