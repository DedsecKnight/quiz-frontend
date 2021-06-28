interface Props {
    choice: string;
    answer: string;
    active: boolean;
    updateChoice: () => void;
}

const AnswerBox: React.FC<Props> = ({
    choice,
    answer,
    active,
    updateChoice,
}) => {
    return (
        <div
            className={`border-2 border-gray-200 w-full rounded-xl p-3 cursor-pointer ${
                active ? "bg-blue-500" : ""
            }`}
            onClick={updateChoice}
        >
            <h1
                className={`text-md font-regular ${
                    active ? "text-white" : "text-blue-400"
                }`}
            >
                {choice}. {answer}
            </h1>
        </div>
    );
};

export default AnswerBox;
