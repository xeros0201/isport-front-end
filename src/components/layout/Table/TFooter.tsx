interface TFooterProps {
  children: React.ReactNode | React.ReactNode[];
}

const TFooter = ({ children }: TFooterProps) => (
  <tfoot className="thead">{children}</tfoot>
);

export default TFooter;