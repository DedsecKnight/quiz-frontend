import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { useHistory } from "react-router-dom";
import { client } from "../../graphql/client";
import { SubmitSolution } from "../../graphql/mutation/submit";
import { getQuizById } from "../../graphql/query/getQuizzes";
import { getUserInfo } from "../../graphql/query/user";
import AnswerBox from "./AnswerBox";

interface MatchData {
    id: string;
}

interface SubmissionInput {
    userId: number;
    quizId: number;
    answers: number[];
}

const StartQuiz = () => {
    const match = useRouteMatch("/start-quiz/:id");
    const history = useHistory();
    const userData = client.readQuery({
        query: getUserInfo,
    });
    const matchData: MatchData = match
        ? (match.params as MatchData)
        : {
              id: "0",
          };

    if (matchData.id === "0") {
        history.push("/browse-quiz");
    }

    if (!userData || userData === null) history.push("/login");

    const { myInfo } = userData;

    const [currentPage, setCurrentPage] = useState(0);
    const [submission, setSubmission] = useState<SubmissionInput>({
        userId: parseInt(myInfo.id) || -1,
        quizId: parseInt(matchData.id),
        answers: [],
    });

    const { loading, error, data } = useQuery(getQuizById, {
        variables: {
            quizId: parseInt(matchData.id),
        },
    });

    useEffect(() => {
        if (data) {
            let submissionInit = data.quizById.questions.map(() => -1);
            setSubmission((prev) => ({
                ...prev,
                answers: submissionInit,
            }));
        }
    }, [data]);

    const [submitSolution] = useMutation(SubmitSolution, {
        variables: {
            submitInput: submission,
        },
        onCompleted: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    if (error) {
        console.log(error.graphQLErrors);
        return <div>Error occurred</div>;
    }

    if (loading) return <div>Loading</div>;

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
