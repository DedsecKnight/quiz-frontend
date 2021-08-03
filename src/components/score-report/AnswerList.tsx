interface Props {
    questions: Array<{
        question: string;
        correctAnswer: {
            answer: string;
        };
    }>;
    answers: Array<{
        answer: string;
        isCorrect: boolean;
    }>;
}

const AnswerList: React.FC<Props> = ({ questions, answers }) => {
    return (
        <div className="m-6">
            {questions.map((question, idx) => (
                <div
                    className="border-2 rounded-xl p-6 flex flex-col justify-between gap-y-5"
                    key={idx}
                >
                    <h1 className="text-xl text-blue-900 text-medium">
                        Question #{idx + 1}: {question.question}
                    </h1>
                    <div className="mt-4">
                        {answers[idx].isCorrect ? (
                            <div className="flex flex-row gap-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#10B981"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <h1 className="text-green-500 text-lg">
                                    Your Answer: {answers[idx].answer}
                                </h1>
                            </div>
                        ) : (
                            <div className="flex flex-row gap-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#DC2626"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                <h1 className="text-red-600 text-lg">
                                    Your Answer: {answers[idx].answer}
                                </h1>
                            </div>
                        )}
                        <div className="flex flex-row gap-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#10B981"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <h1 className="text-green-500 text-lg">
                                Correct Answer: {question.correctAnswer.answer}
                            </h1>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnswerList;
