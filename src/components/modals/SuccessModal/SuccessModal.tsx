import "./SuccessModal.scss";
import { Modal, Row } from "../../layout";
import { Button, Icon } from "../../common";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
    statment?: string ;
    buttonLabel?: string;
    buttonOnClick: () => void;
}

const SuccessModal = ({ isOpen, onClose, message, statment, buttonLabel, buttonOnClick }: SuccessModalProps) => {

    return (
        <Modal
            className="success-modal"
            isOpen={isOpen}
            onClose={onClose}
            maxWidth={800}
        >   
            <div className="success-modal__icon">
                <Icon className="IoCheckmarkSharp success" name="IoCheckmarkSharp" />
            </div>
            <h1> {statment||'match pushblished'} successfully</h1>
            <p>{message||'You have successfully pushblished the match!'}</p>
            <Row noFlex justifyContent="center">
                <Button
                    label={buttonLabel||'View match report'}
                    type="outlined"
                    size="large"
                    onClick={buttonOnClick}
                />
            </Row>
        </Modal>
    );
};

export default SuccessModal;