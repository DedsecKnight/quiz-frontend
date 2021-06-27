import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../graphql/query/user";
import { injectClass } from "../utilities/inject-class";
import { createQuiz } from "../../graphql/mutation/createQuiz";

interface AnswerObj {
    answer: string;
    isCorrect: boolean;
}

interface QuestionObj {
    question: string;
    answers: AnswerObj[];
}

interface QuizForm {
    userId: number;
    quizName: string;
    difficulty: string;
    category: string;
    questions: QuestionObj[];
}

const CreateQuiz = () => {
    const { error, data } = useQuery(getUserInfo);

    const [currentPage, setCurrentPage] = useState(0);
    const [newQuiz, setNewQuiz] = useState<QuizForm>({
        userId: 0,
        quizName: "",
        difficulty: "",
        category: "",
        questions: [],
    });

    const [createNewQuiz] = useMutation(createQuiz, {
        variables: {
            quizObj: newQuiz,
        },
        onCompleted: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createNewQuiz();
        console.log(newQuiz);
    };

    const updateQuizInfo = (e: React.ChangeEvent<any>) => {
        setNewQuiz({
            ...newQuiz,
            [e.target.name]: e.target.value,
        });
    };

    const addQuestion = () => {
        const newQuestion: QuestionObj = {
            question: "",
            answers: [],
        };

        for (let i = 0; i < 4; i++)
            newQuestion.answers.push({
                answer: "",
                isCorrect: false,
            });

        setNewQuiz({
            ...newQuiz,
            questions: [...newQuiz.questions, newQuestion],
        });
        setCurrentPage((prev) => prev + 1);
    };

    const updateQuestion = (
        e: React.ChangeEvent<HTMLInputElement>,
        questionIdx: number
    ) => {
        let questionList = newQuiz.questions;
        questionList[questionIdx].question = e.target.value;
        setNewQuiz({
            ...newQuiz,
            questions: questionList,
        });
    };

    const updateAnswer = (
        e: React.ChangeEvent<HTMLInputElement>,
        questionIdx: number,
        answerIdx: number
    ) => {
        let questionList = newQuiz.questions;
        if (e.target.name === "answer") {
            questionList[questionIdx].answers[answerIdx].answer =
                e.target.value;
        } else
            questionList[questionIdx].answers[answerIdx].isCorrect =
                e.target.checked;
        setNewQuiz({
            ...newQuiz,
            questions: questionList,
        });
    };

    const deleteQuestion = (idx: number) => {
        let questionList = newQuiz.questions;
        questionList.splice(idx, 1);
        setNewQuiz({
            ...newQuiz,
            questions: questionList,
        });
        setCurrentPage((prev) => Math.min(prev, questionList.length));
    };

    const { quizName, difficulty, category } = newQuiz;

    useEffect(() => {
        if (data)
            setNewQuiz((prev) => ({
                ...prev,
                userId: data.myInfo.id,
            }));
    }, [data]);

    if (error) return <div>Error</div>;

    if (data)
        return (
            <>
                <div
                    className="block md:hidden cursor-pointer p-4"
                    onClick={() => injectClass()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </div>
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

                {/* If page is zero, show step 1 page */}
                <form onSubmit={(e) => submit(e)}>
                    {currentPage === 0 ? (
                        <div className="p-6 lg:px-10 lg:py-6 flex flex-col justify-between">
                            <h1 className="text-xl text-blue-900 font-medium">
                                Step 1: Let's give your quiz some basic
                                information
                            </h1>
                            <div className="flex flex-col my-4">
                                <input
                                    type="text"
                                    name="quizName"
                                    placeholder="Quiz name"
                                    className="rounded-lg my-2"
                                    value={quizName}
                                    onChange={(e) => updateQuizInfo(e)}
                                />
                                <select
                                    name="difficulty"
                                    value={difficulty}
                                    className="rounded-lg my-2"
                                    onChange={(e) => updateQuizInfo(e)}
                                >
                                    <option value="">
                                        Choose a difficulty
                                    </option>
                                    <option value="Easy">Easy</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Hard">Hard</option>
                                </select>
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Choose a category"
                                    className="rounded-lg my-2"
                                    value={category}
                                    onChange={(e) => updateQuizInfo(e)}
                                />
                            </div>
                            <div className="flex flex-row justify-end gap-x-3">
                                {currentPage === newQuiz.questions.length && (
                                    <button
                                        type="button"
                                        className="p-3 bg-blue-500 text-white rounded-lg"
                                        onClick={() => addQuestion()}
                                    >
                                        Add new question
                                    </button>
                                )}
                                {currentPage < newQuiz.questions.length && (
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
                                    newQuiz.questions[currentPage - 1].question
                                }`}
                            </h1>
                            <div className="flex flex-col mb-4">
                                <input
                                    type="text"
                                    name="question"
                                    placeholder="Enter your question here"
                                    className="rounded-lg my-2"
                                    value={
                                        newQuiz.questions[currentPage - 1]
                                            .question
                                    }
                                    onChange={(e) => {
                                        updateQuestion(e, currentPage - 1);
                                    }}
                                />
                                {newQuiz.questions[currentPage - 1].answers.map(
                                    (ansObj, idx) => (
                                        <div key={idx} className="my-3 w-full">
                                            <input
                                                type="text"
                                                name="answer"
                                                placeholder={`Option ${
                                                    idx + 1
                                                }`}
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
                                    {currentPage ===
                                    newQuiz.questions.length ? (
                                        <>
                                            <button
                                                type="button"
                                                className="p-3 bg-blue-500 text-white rounded-lg"
                                                onClick={() => addQuestion()}
                                            >
                                                Add new question
                                            </button>
                                            <button
                                                type="button"
                                                className="p-3 bg-red-600 text-white rounded-lg"
                                                onClick={() =>
                                                    deleteQuestion(
                                                        currentPage - 1
                                                    )
                                                }
                                            >
                                                Delete question
                                            </button>
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
                                                className="p-3 bg-red-600 text-white rounded-lg"
                                                onClick={() =>
                                                    deleteQuestion(
                                                        currentPage - 1
                                                    )
                                                }
                                            >
                                                Delete question
                                            </button>
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

    return <div>Loading</div>;
};

export default CreateQuiz;
