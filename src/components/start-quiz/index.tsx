import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { useHistory } from "react-router-dom";
import Loading from "../utilities/Loading";
import AnswerBox from "./AnswerBox";

import ErrorComponent from "../error/Error";
import NoDataFound from "../utilities/NoDataFound";
import { BAD_USER_INPUT, UNAUTHENTICATED } from "../error/errorCode";
import { logout } from "../utilities/logout";
import AlertList from "../error/AlertList";
import Hamburger from "../utilities/Hamburger";

interface MatchData {
    id: number;
}

interface SubmissionInput {
    quizId: number;
    answers: number[];
}

const GET_QUIZ_DATA = gql`
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
    }
`;

const SUBMIT_SOLUTION = gql`
    mutation SubmitSolution($submitInput: SubmitInput!) {
        submit(submitInput: $submitInput) {
            id
            score
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
    >(GET_QUIZ_DATA, {
        variables: {
            quizId: matchData.id,
        },
    });

    const [currentPage, setCurrentPage] = useState(0);
    const [submission, setSubmission] = useState<SubmissionInput>({
        quizId: matchData.id,
        answers: [],
    });
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            let submissionInit = data.quizById.questions.map(() => -1);
            setSubmission((prev) => ({
                ...prev,
                answers: submissionInit,
            }));
        }
    }, [data]);

    const [submitSolution] = useMutation<
        { submit: { score: number; id: number } },
        { submitInput: SubmissionInput }
    >(SUBMIT_SOLUTION, {
        variables: {
            submitInput: submission,
        },
        onCompleted: (data) => {
            history.push(`/score-report/${data.submit.id}`);
        },
        onError: (error) => {
            if (error.networkError) history.push("/500");
            error.graphQLErrors.forEach((errorObject) => {
                if (errorObject.extensions!.code === BAD_USER_INPUT)
                    Object.keys(
                        errorObject.extensions!.validationErrors
                    ).forEach((key) => {
                        if (
                            errorObject.extensions!.validationErrors[
                                key
                            ] instanceof Array
                        ) {
                            errorObject.extensions!.validationErrors[
                                key
                            ].forEach((err: string) => {
                                setErrors((prev) => [...prev, err]);
                            });
                        } else
                            setErrors((prev) => [
                                ...prev,
                                errorObject.extensions!.validationErrors[key],
                            ]);
                    });
                else if (errorObject.extensions!.code === UNAUTHENTICATED) {
                    logout();
                    history.push("/login");
                } else history.push("/500");
            });
        },
    });

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;
    if (!data) return <NoDataFound />;

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
        submitSolution();
    };

    return (
        <div className="w-full h-full p-6 flex flex-col justify-around gap-y-6 ">
            <Hamburger />
            <AlertList
                errors={errors}
                onCloseAlert={(idx) => {
                    let currentErrors = [...errors];
                    currentErrors.splice(idx, 1);
                    setErrors(currentErrors);
                }}
            />
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
