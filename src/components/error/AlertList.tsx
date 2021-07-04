import Alert from "./Alert";

interface Props {
    errors: string[];
    onCloseAlert: (idx: number) => void;
}

const AlertList: React.FC<Props> = ({ errors, onCloseAlert }) => {
    return errors.length <= 0 ? (
        <div className="hidden"></div>
    ) : (
        <div className="w-4/5 mx-auto my-4 flex flex-col gap-y-3">
            {errors.map((error, idx) => (
                <Alert
                    message={error}
                    closeAlert={() => onCloseAlert(idx)}
                    key={idx}
                />
            ))}
        </div>
    );
};

export default AlertList;
