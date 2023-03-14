import React from "react";

interface RowItemPros {
    flexGrow?: number;
    children: React.ReactNode | React.ReactNode[];
    noFlex?: boolean;
}

const RowItem = ({flexGrow, children, noFlex} :RowItemPros) => {
    return (
        <div className="row__item" style={{ flex: noFlex ? 0 : flexGrow?? 1}}>
            {children}
        </div>
    )
}

export default RowItem;