import classNames from "classnames";

interface TrProps {
  children: React.ReactNode | React.ReactNode[];
  expanded?: boolean;
}

const Tr = ({ children, expanded = false }: TrProps) => (
  <tr
    className={classNames({
      "tr": true,
      "tr--expanded": expanded
    })}
  >
    {children}
  </tr>
);

export default Tr;