import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { useHistory } from "react-router-dom";
import { SubmitSolution } from "../../graphql/mutation/submit";
import { checkError } from "../error/checkError";
import AnswerBox from "./AnswerBox";

interface MatchData {
    id: number;
}

interface SubmissionInput {
    userId: number;
    quizId: number;
    answers: number[];
}

const GET_QUIZ_AND_USER_DATA = gql`
    query GetQuizUserData($quizId: Float!) {
        quizById(id: $quizId) {
            quizName
            questions {
                question
                answers {
                    id
                    answer
                }
            }
        }
        myInfo {
            id
        }
    }
`;

interface QueryData {
    quizById: {
        quizName: string;
        questions: Array<{
            question: string;
            answers: Array<{
                id: string;
                answer: string;
            }>;
        }>;
    };
    myInfo: {
        id: string;
    };
}

const StartQuiz = () => {
    const history = useHistory();

    const match = useRouteMatch("/start-quiz/:id");
    const matchData: MatchData = {
        id: match ? parseInt((match.params as { id: string }).id) : 0,
    };

    if (matchData.id === 0) {
        history.push("/browse-quiz");
    }

    const { loading, error, data } = useQuery<
        QueryData,
        {
            quizId: number;
        }
    >(GET_QUIZ_AND_USER_DATA, {
        variables: {
            quizId: matchData.id,
        },
    });

    const [currentPage, setCurrentPage] = useState(0);
    const [submission, setSubmission] = useState<SubmissionInput>({
        userId: -1,
        quizId: matchData.id,
        answers: [],
    });

    useEffect(() => {
        if (data) {
            let submissionInit = data.quizById.questions.map(() => -1);
            setSubmission((prev) => ({
                ...prev,
                userId: parseInt(data.myInfo.id),
                answers: submissionInit,
            }));
        }
    }, [data]);

    const [submitSolution] = useMutation<
        { submit: { score: number } },
        { submitInput: SubmissionInput }
    >(SubmitSolution, {
        variables: {
            submitInput: submission,
        },
        onCompleted: (data) => {
            console.log(data);
            history.push("/");
        },
        onError: (error) => {
            console.log(error);
            checkError(history, error);
        },
    });

    if (loading) return <div>Loading...</div>;

    if (error) {
        checkError(history, error);
        return <div></div>;
    }

    if (!data) {
        history.push("/browse-quiz");
        return <div></div>;
    }

    const { quizById } = data;

    const updateOption = (id: string) => {
        let tempAns = [...submission.answers];
        tempAns[currentPage] = parseInt(id);
        setSubmission({
            ...submission,
            answers: tempAns,
        });
    };

    const submit = () => {
        console.log(submission);
        submitSolution();
    };

    return (
        <div className="w-full h-full p-6 flex flex-col justify-around">
            <div className="header">
                <h1 className="text-lg font-medium text-blue-600">
                    You are currently working on:{" "}
                    <span className="text-blue-900">{quizById.quizName}</span>
                </h1>
            </div>

            <div className="question">
                <h1 className="text-xl font-medium text-blue-800">
                    Question {currentPage + 1}:{" "}
                    {quizById.questions[currentPage].question}
                </h1>
            </div>

            <div className="flex flex-col gap-y-2">
                <div className="flex flex-col items-center gap-y-2">
                    <AnswerBox
                        choice="A"
                        answer={
                            quizById.questions[currentPage].answers[0].answer
                        }
                        active={
                            submission.answers[currentPage] ===
                            parseInt(
                                quizById.questions[currentPage].answers[0].id
                            )
                        }
                        updateChoice={() => {
                            updateOption(
                                quizById.questions[currentPage].answers[0].id
                            );
                        }}
                    />
                    <AnswerBox
                        choice="B"
                        answer={
                            quizById.questions[currentPage].answers[1].answer
                        }
                        active={
                            submission.answers[currentPage] ===
                            parseInt(
                                quizById.questions[currentPage].answers[1].id
                            )
                        }
                        updateChoice={() => {
                            updateOption(
                                quizById.questions[currentPage].answers[1].id
                            );
                        }}
                    />
                </div>
                <div className="flex flex-col items-center gap-y-2">
                    <AnswerBox
                        choice="C"
                        answer={
                            quizById.questions[currentPage].answers[2].answer
                        }
                        active={
                            submission.answers[currentPage] ===
                            parseInt(
                                quizById.questions[currentPage].answers[2].id
                            )
                        }
                        updateChoice={() => {
                            updateOption(
                                quizById.questions[currentPage].answers[2].id
                            );
                        }}
                    />
                    <AnswerBox
                        choice="D"
                        answer={
                            quizById.questions[currentPage].answers[3].answer
                        }
                        active={
                            submission.answers[currentPage] ===
                            parseInt(
                                quizById.questions[currentPage].answers[3].id
                            )
                        }
                        updateChoice={() => {
                            updateOption(
                                quizById.questions[currentPage].answers[3].id
                            );
                        }}
                    />
                </div>
            </div>

            <div
                className={`flex flex-row ${
                    currentPage === 0 ? "justify-end" : "justify-between"
                }`}
            >
                {currentPage > 0 && (
                    <button
                        type="button"
                        className="p-3 bg-gray-400 text-white rounded-lg"
                        // onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                )}
                {currentPage === quizById.questions.length - 1 ? (
                    <button
                        type="button"
                        className="p-3 bg-purple-700 text-white rounded-lg"
                        onClick={() => submit()}
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        type="button"
                        className="p-3 bg-purple-500 text-white rounded-lg"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default StartQuiz;
