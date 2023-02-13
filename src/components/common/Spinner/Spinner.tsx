import './Spinner.scss';

interface SpinnerProps {
    size?: 'small' | 'large';	
}

const Spinner = ({ size = 'small' }: SpinnerProps) => {
    const sizeClass = 'spinner--' + size;

    return (
        <div className={`spinner ${sizeClass}`}>
            <div className={`spinner__inner `}></div>
        </div>
    )
}

export default Spinner;