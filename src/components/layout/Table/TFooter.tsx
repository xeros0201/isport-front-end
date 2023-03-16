interface TFooterProps {
  children: React.ReactNode | React.ReactNode[];
}

const TFooter = ({ children }: TFooterProps) => (
  <tfoot className="tfoot">{children}</tfoot>
);

export default TFooter;