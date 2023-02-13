declare global {

    export interface FormProps {
        id?: number;
        onSuccessfulSubmit?: () => void;
    }

}

export {};