interface TrProps {
    children: React.ReactNode | React.ReactNode[];
}

const Tr = ({ children }: TrProps) => (
    <tr className="tr">{children}</tr>
);

export default Tr;