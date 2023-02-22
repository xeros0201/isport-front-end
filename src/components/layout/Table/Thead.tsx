interface TheadProps {
    children: React.ReactNode | React.ReactNode[];
}

const Thead = ({ children }: TheadProps) => (
    <thead className="thead">{children}</thead>
);

export default Thead;