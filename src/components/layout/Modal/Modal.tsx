import { ReactNode } from "react";
import "./Modal.scss";
import { Icon } from "../../common";
import classNames from "classnames";

type Props = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
};

const Modal = ({ className, isOpen, onClose, children, maxWidth = 300 }: Props) => {

  const modalClasses = classNames({
    modal: true,
    ...className ? { [className]: true } : {},
  })

  if (!isOpen) return null;

  return (
    <div className={modalClasses}>
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__main" style={{ maxWidth }}>
        <div className="modal__close" onClick={onClose}>
          <Icon name="IoCloseOutline" size={40} />
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
