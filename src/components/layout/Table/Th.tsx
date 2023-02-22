import { SortDirection } from "@tanstack/react-table";
import classNames from "classnames";

interface ThProps {
    children: React.ReactNode | React.ReactNode[];
    onClick?: (event: unknown) => void;
    sorted?: SortDirection | false;
}

const Th = ({ children, onClick, sorted }: ThProps) => {
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
        <th className={thClasses} onClick={onClick}>
            {children} {renderArrow()}
        </th>
    )
};

export default Th;