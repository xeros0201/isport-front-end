import { SortDirection } from "@tanstack/react-table";
import classNames from "classnames";

interface ThProps {
    children: React.ReactNode | React.ReactNode[];
    onClick?: (event: unknown) => void;
    sorted?: SortDirection | false;
    colSpan?: number;
}

const Th = ({ children, colSpan, onClick, sorted }: ThProps) => {
    const renderArrow = () => {
        switch (sorted) {
            case 'asc':
                return ' 🔼';
            case 'desc':
                return ' 🔽';
            default:
                return null;
        }
    }

    const thClasses = classNames({
        th: true,
        "th--clickable": onClick,
    });

    return (
        <th className={thClasses} onClick={onClick} colSpan={colSpan}>
            {children} {renderArrow()}
        </th>
    )
};

export default Th;