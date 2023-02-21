interface TbodyProps {
    children: React.ReactNode | React.ReactNode[];
}

const Tbody = ({ children }: TbodyProps) => (
    <tbody className="tbody">{children}</tbody>
);

export default Tbody;