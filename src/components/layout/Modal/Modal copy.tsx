import { ReactNode } from "react";
import "./Modal.scss";
import {
  FaClipboard,
  FaTimes,
  FaTimesCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import { Button } from "../../common";
type Props = {
  show: boolean;
  title: string;
  text: string;
  children: ReactNode;
  confirmText?: string;
  onConfirmClicked?: () => void;
  onCloseClicked: () => void;
};

const Modal = ({
  show,
  title,
  text,
  children,
  confirmText = "OK",
  onConfirmClicked,
  onCloseClicked,
}: Props) => {
  return show ? (
    <div className="modal_wrapper">
      <div className="modal_main">
        <div className="modal_close" onClick={onCloseClicked}>
          <FaTimes size={20} />
        </div>
        <div>
          <FaTimesCircle size={80} color="#7e1d12" />
        </div>
        <div className="modal_title">
          {title}
          <br />
        </div>
        {text}
        <div
          className="modal_button"
        >
          <Button onClick={onCloseClicked} label={"Continue"} />
          {onConfirmClicked && (
            <Button
              type="confirm"
              label={"Remove Player"}
              onClick={onConfirmClicked}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
