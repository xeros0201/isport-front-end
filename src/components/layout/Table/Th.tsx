import { SortDirection } from "@tanstack/react-table";
import classNames from "classnames";
import { Icon } from "../../common";

interface ThProps {
    children: React.ReactNode | React.ReactNode[];
    onClick?: (event: unknown) => void;
    propertyHeader?: boolean;
    sorted?: SortDirection | false;
    colSpan?: number;
}

const Th = ({ children, colSpan, onClick, propertyHeader = false, sorted }: ThProps) => {
    const renderArrow = () => {
        switch (sorted) {
            case 'asc':
                return <Icon name="IoCaretUp" />;
            case 'desc':
                return <Icon name="IoCaretDown" />;
            default:
                return <></>;
        }
    }

    const thClasses = classNames({
        th: true,
        "th--clickable": onClick,
        "th--property-header": propertyHeader
    });

    return (
        <th className={thClasses} onClick={onClick} colSpan={colSpan}>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            {children}
            {renderArrow()}
          </div>
        </th>
    )
};

export default Th;