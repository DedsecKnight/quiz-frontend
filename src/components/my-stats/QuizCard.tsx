interface Props {
    name: string;
    difficulty: string;
    score: number;
}

const QuizCard: React.FC<Props> = ({ name, difficulty, score }) => {
    return (
        <div className="flex flex-row rounded-xl mx-auto p-3 w-full lg:w-4/5 justify-between items-center shadow-lg border-2 items-center">
            <div className="flex flex-row items-center">
                <div className="badge">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#2563EB"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <div className="card-data ml-6">
                    <h1 className="text-left font-medium text-xl text-blue-900">
                        {name}
                    </h1>
                    <p className="text-left text-blue-500">
                        Difficulty: {difficulty}
                    </p>
                </div>
            </div>
            <div className="w-1/4">
                <h1 className="text-right font-medium text-3xl text-blue-900">
                    {score}%
                </h1>
            </div>
        </div>
    );
};

export default QuizCard;
