import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import AlertList from "../error/AlertList";
import ErrorComponent from "../error/Error";
import { BAD_USER_INPUT, UNAUTHENTICATED } from "../error/errorCode";
import Hamburger from "../utilities/Hamburger";
import Loading from "../utilities/Loading";
import { logout } from "../utilities/logout";
import NoDataFound from "../utilities/NoDataFound";
import { QuizForm } from "./interfaces";

interface MatchData {
    id: number;
}

interface QueryData {
    quizById: {
        quizName: string;
        difficulty: {
            type: string;
        };
        category: {
            categoryName: string;
        };
        questions: Array<{
            question: string;
            answers: Array<{
                answer: string;
                isCorrect: boolean;
            }>;
        }>;
    };
}

interface MutationData {
    updateQuiz: {
        id: number;
    };
}

const GET_QUIZ_BY_ID = gql`
    query GetQuiz($id: Float!) {
        quizById(id: $id) {
            quizName
            difficulty {
                type
            }
            category {
                categoryName
            }
            questions {
                question
                answers {
                    answer
                    isCorrect
                }
            }
        }
    }
`;

const UPDATE_QUIZ = gql`
    mutation UpdateQuiz($quizId: Float!, $quizObj: QuizArgs!) {
        updateQuiz(quiz: $quizObj, quizId: $quizId) {
            id
        }
    }
`;

const EditQuiz = () => {
    const history = useHistory();
    const match = useRouteMatch("/edit-quiz/:id");

    const matchData: MatchData = {
        id: match ? parseInt((match.params as { id: string }).id) : 0,
    };

    if (matchData.id === 0) {
        history.push("/my-quizzes");
    }

    const [errors, setErrors] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [quiz, setQuiz] = useState<QuizForm>({
        quizName: "",
        difficulty: "",
        category: "",
        questions: [],
    });

    const [updateQuiz] = useMutation<
        MutationData,
        {
            quizId: number;
            quizObj: QuizForm;
        }
    >(UPDATE_QUIZ, {
        variables: {
            quizId: matchData.id,
            quizObj: quiz,
        },
        onCompleted: () => {
            history.push("/my-quizzes");
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
                    logout().then(() => {
                        history.push("/login");
                    });
                } else history.push("/500");
            });
        },
    });

    const { loading, error, data } = useQuery<
        QueryData,
        {
            id: number;
        }
    >(GET_QUIZ_BY_ID, {
        variables: {
            id: matchData.id,
        },
    });

    useEffect(() => {
        if (data) {
            const { quizById } = data;
            setQuiz({
                quizName: quizById.quizName,
                difficulty: quizById.difficulty.type,
                category: quizById.category.categoryName,
                questions: quizById.questions.map((question) => ({
                    question: question.question,
                    answers: question.answers.map((answer) => ({
                        answer: answer.answer,
                        isCorrect: answer.isCorrect,
                    })),
                })),
            });
        }
    }, [data]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);
        updateQuiz();
    };

    const updateQuizInfo = (e: React.ChangeEvent<any>) => {
        setQuiz({
            ...quiz,
            [e.target.name]: e.target.value,
        });
    };

    const updateQuestion = (
        e: React.ChangeEvent<HTMLInputElement>,
        questionIdx: number
    ) => {
        let questionList = [...quiz.questions];
        questionList[questionIdx].question = e.target.value;
        setQuiz({
            ...quiz,
            questions: questionList,
        });
    };

    const updateAnswer = (
        e: React.ChangeEvent<HTMLInputElement>,
        questionIdx: number,
        answerIdx: number
    ) => {
        let questionList = quiz.questions;
        if (e.target.name === "answer") {
            questionList[questionIdx].answers[answerIdx].answer =
                e.target.value;
        } else
            questionList[questionIdx].answers[answerIdx].isCorrect =
                e.target.checked;
        setQuiz({
            ...quiz,
            questions: questionList,
        });
    };

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;
    if (!data) return <NoDataFound />;

    return (
        <>
            <Hamburger />
            <div className="my-7 flex flex-col-reverse items-center gap-y-7 lg:flex-row rounded-lg">
                <div className="flex flex-col justify-between w-full px-7">
                    <div className="my-stat-header border-b-2 pb-5">
                        <h1 className="font-bold text-center lg:text-left text-3xl text-blue-900">
                            Create Quiz
                        </h1>
                        <p className="text-center lg:text-left text-indigo-400">
                            Let's create a quiz for everyone
                        </p>
                    </div>
                </div>
            </div>

            <AlertList
                errors={errors}
                onCloseAlert={(idx) => {
                    let currentErrors = [...errors];
                    currentErrors.splice(idx, 1);
                    setErrors(currentErrors);
                }}
            />

            {/* If page is zero, show step 1 page */}
            <form onSubmit={(e) => submit(e)}>
                {currentPage === 0 ? (
                    <div className="p-6 lg:px-10 lg:py-6 flex flex-col justify-between">
                        <h1 className="text-xl text-blue-900 font-medium">
                            Step 1: Let's give your quiz some basic information
                        </h1>
                        <div className="flex flex-col my-4">
                            <input
                                type="text"
                                name="quizName"
                                placeholder="Quiz name"
                                className="rounded-lg my-2"
                                value={quiz.quizName}
                                onChange={(e) => updateQuizInfo(e)}
                            />
                            <select
                                name="difficulty"
                                value={quiz.difficulty}
                                className="rounded-lg my-2"
                                onChange={(e) => updateQuizInfo(e)}
                            >
                                <option value="">Choose a difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Normal">Normal</option>
                                <option value="Hard">Hard</option>
                            </select>
                            <input
                                type="text"
                                name="category"
                                placeholder="Choose a category"
                                className="rounded-lg my-2"
                                value={quiz.category}
                                onChange={(e) => updateQuizInfo(e)}
                            />
                        </div>
                        <div className="flex flex-row justify-end gap-x-3">
                            {currentPage < quiz.questions.length && (
                                <button
                                    type="button"
                                    className="p-3 bg-purple-500 text-white rounded-lg"
                                    onClick={() =>
                                        setCurrentPage((prev) => prev + 1)
                                    }
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="p-6 lg:px-10 lg:py-6 flex flex-col justify-between">
                        <h1 className="text-xl text-blue-900 font-medium">
                            Step 2: Let's create some questions
                        </h1>
                        <h1 className="text-xl text-indigo-500 font-medium mt-6 mb-3">
                            {`Question ${currentPage}: ${
                                quiz.questions[currentPage - 1].question
                            }`}
                        </h1>
                        <div className="flex flex-col mb-4">
                            <input
                                type="text"
                                name="question"
                                placeholder="Enter your question here"
                                className="rounded-lg my-2"
                                value={quiz.questions[currentPage - 1].question}
                                onChange={(e) => {
                                    updateQuestion(e, currentPage - 1);
                                }}
                            />
                            {quiz.questions[currentPage - 1].answers.map(
                                (ansObj, idx) => (
                                    <div key={idx} className="my-3 w-full">
                                        <input
                                            type="text"
                                            name="answer"
                                            placeholder={`Option ${idx + 1}`}
                                            className="rounded-lg my-2 w-full"
                                            value={ansObj.answer}
                                            onChange={(e) => {
                                                updateAnswer(
                                                    e,
                                                    currentPage - 1,
                                                    idx
                                                );
                                            }}
                                        />
                                        <div className="flex flex-row items-center gap-x-2">
                                            <input
                                                type="checkbox"
                                                name="isCorrect"
                                                id="correct"
                                                checked={ansObj.isCorrect}
                                                onChange={(e) =>
                                                    updateAnswer(
                                                        e,
                                                        currentPage - 1,
                                                        idx
                                                    )
                                                }
                                            />
                                            <label>Is Correct</label>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="flex flex-row justify-between gap-x-3">
                            {currentPage > 0 && (
                                <button
                                    type="button"
                                    className="p-3 bg-gray-400 text-white rounded-lg"
                                    onClick={() =>
                                        setCurrentPage((prev) => prev - 1)
                                    }
                                >
                                    Previous
                                </button>
                            )}
                            <div className="flex flex-row gap-x-3">
                                {currentPage === quiz.questions.length ? (
                                    <>
                                        <button
                                            type="submit"
                                            className="p-3 bg-purple-700 text-white rounded-lg"
                                        >
                                            Submit
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="p-3 bg-purple-500 text-white rounded-lg"
                                            onClick={() =>
                                                setCurrentPage(
                                                    (prev) => prev + 1
                                                )
                                            }
                                        >
                                            Next
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </>
    );
};

export default EditQuiz;
