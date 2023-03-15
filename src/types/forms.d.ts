declare global {

    export interface FormProps {
        id?: number;
        onSuccessfulSubmit?: () => void;
    }

    export interface UserFormProps extends FormProps{
        id?: string;
    }

}

export {};