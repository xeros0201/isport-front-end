import "./Row.scss";
import React, { CSSProperties } from "react";

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
   * 
   */
  disableWrapping?: boolean;
  /**
   * 
   */
  rowMarginTop?: number;
  /**
   * default is 0 if no specified configuration for each row item => no need wrapping each row item in a `RowItem` component
   * value is 1 if there is specified configuration for each row item => need wrapping each row item in a `RowItem` component
   */
  rowType?: number;
}

const Row = ({ children, alignItems, removeSpacing, noFlex, disableWrapping, rowMarginTop, rowType = 0 }: RowProps) => {
  /**
   * Convert the children to an array to make them
   * easier to work with.
   */
  const childrenArray = React.Children.toArray(children);

  const spacingModifier = removeSpacing ? "row--nospacing" : "";
  const wrappingModifer = disableWrapping ? "row--disallow-wrapping" : "";

  return (
    <div className={`row ${spacingModifier} ${wrappingModifer} `} style={{ alignItems, marginTop: `${!!rowMarginTop ? rowMarginTop : 0}px` }}>
      {childrenArray.map((child) => {
        if (rowType == 0)
          return <div className="row__item" style={{ flex: noFlex ? 0 : 1 }}>{child}</div>;
        else
          return <>{child}</>;
      })}
    </div>
  );
};

export default Row;
