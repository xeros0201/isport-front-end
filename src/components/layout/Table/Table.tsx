import classNames from "classnames";
import { useMemo } from "react";
import "./Table.scss"

interface TableProps {
    children: React.ReactNode | React.ReactNode[];
    compact?: boolean;
    striped?: boolean;
    hasFirstColumn?: boolean;
}

const Table = ({
    children,
    compact = false,
    striped = false,
    hasFirstColumn = false,
}: TableProps) => {

    const tableClasses = useMemo(() => classNames({
        'table': true,
        'table--compact': compact,
        'table--striped': striped,
        'table--has-first-column': hasFirstColumn,
    }), [compact, striped, hasFirstColumn]);

    return (
        <div style={{ overflow: 'auto' }}>
            <table className={tableClasses}>
                {children}
            </table>
        </div>
    );
};

export default Table;