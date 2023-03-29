import "./DangerModal.scss";
import { Modal, Row } from "../../layout";
import { Button, Icon } from "../../common";

interface DangerModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    buttonLabel: string;
    buttonOnClick: () => void;
}

const DangerModal = ({ isOpen, onClose, message, buttonLabel, buttonOnClick }: DangerModalProps) => {
    return (
        <Modal
            className="danger-modal"
            isOpen={isOpen}
            onClose={onClose}
            maxWidth={800}
        >
            <div className="danger-modal__icon">
                <Icon className="IoCloseOutline danger" name="IoCloseOutline" />
            </div>
            <h1>Are you sure?</h1>
            <p>{message}</p>
            <Row noFlex justifyContent="center">
                <Button
                    label="Cancel"
                    type="secondary"
                    size="large"
                    onClick={onClose}
                />
                <Button
                    label={buttonLabel}
                    type="danger"
                    size="large"
                    onClick={buttonOnClick}
                />
            </Row>
        </Modal>
    );
};

export default DangerModal;