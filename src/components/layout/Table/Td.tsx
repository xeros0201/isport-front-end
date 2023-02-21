interface TdProps {
    children: React.ReactNode | React.ReactNode[];
}

const Td = ({ children }: TdProps) => (
    <td className="td">{children}</td>
);

export default Td;