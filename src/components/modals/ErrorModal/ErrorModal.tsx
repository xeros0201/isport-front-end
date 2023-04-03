import "./ErrorModal.scss";
import { Modal, Row } from "../../layout";
import { Button, Icon } from "../../common";

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const ErrorModal = ({ isOpen, onClose, message }: ErrorModalProps) => {
    return (
        <Modal
            className="error-modal"
            isOpen={isOpen}
            onClose={onClose}
            maxWidth={800}
        >
            <div className="error-modal__icon">
                <Icon className="IoAlertSharp error" name="IoAlertSharp" />
            </div>
            <h1>Something went wrong</h1>
            <p>{message}</p>
            <Row noFlex justifyContent="center">
                <Button
                    label="Close"
                    type="secondary"
                    size="large"
                    onClick={onClose}
                />
            </Row>
        </Modal>
    );
};

export default ErrorModal;