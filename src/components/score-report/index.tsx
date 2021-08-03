import { gql, useQuery } from "@apollo/client";
import { useHistory, useRouteMatch } from "react-router-dom";
import ErrorComponent from "../error/Error";
import Hamburger from "../utilities/Hamburger";
import Loading from "../utilities/Loading";
import NoDataFound from "../utilities/NoDataFound";
import AnswerList from "./AnswerList";
import ScoreBar from "./ScoreBar";
import SubmissionInfo from "./SubmissionInfo";

interface MatchData {
    id: number;
}

interface QueryData {
    submissionById: {
        score: number;
        author: {
            name: string;
        };
        quiz: {
            quizName: string;
            difficulty: {
                type: string;
            };
            category: {
                categoryName: string;
            };
            questions: Array<{
                question: string;
                correctAnswer: {
                    answer: string;
                };
            }>;
        };
        answers: Array<{
            answer: string;
            isCorrect: boolean;
        }>;
    };
}

const GET_SUBMISSION = gql`
    query GetSubmission($id: Float!) {
        submissionById(id: $id) {
            score
            author {
                name
            }
            quiz {
                quizName
                difficulty {
                    type
                }
                category {
                    categoryName
                }
                questions {
                    question
                    correctAnswer {
                        answer
                    }
                }
            }
            answers {
                answer
                isCorrect
            }
        }
    }
`;

const ScoreReport = () => {
    const history = useHistory();
    const match = useRouteMatch("/score-report/:id");
    const matchData: MatchData = {
        id: match ? parseInt((match.params as { id: string }).id) : 0,
    };

    if (matchData.id === 0) {
        history.push("/");
    }

    const { loading, error, data } = useQuery<
        QueryData,
        {
            id: number;
        }
    >(GET_SUBMISSION, {
        variables: {
            id: matchData.id,
        },
    });

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;
    if (!data) return <NoDataFound />;

    const { submissionById } = data;
    const correctAnswerCount = submissionById.answers.filter(
        (answer) => answer.isCorrect
    ).length;

    console.log(submissionById);

    return (
        <>
            <Hamburger />
            <div className="my-7 flex flex-col reverse items-center gap-y-7 lg:flex-row rounded-lg">
                <div className="flex flex-col justify-between w-full px-7">
                    <div className="my-stat-header border-b-2 pb-5">
                        <h1 className="font-bold text-center lg:text-left text-3xl text-blue-900">
                            Score Report
                        </h1>
                        <p className="text-center lg:text-left text-indigo-400">
                            Your personalized score report
                        </p>
                    </div>

                    <SubmissionInfo
                        quizName={submissionById.quiz.quizName}
                        authorName={submissionById.author.name}
                        difficulty={submissionById.quiz.difficulty.type}
                        category={submissionById.quiz.category.categoryName}
                    />
                    <div className="flex flex-col lg:flex-row gap-y-6 gap-x-6 m-6">
                        <ScoreBar
                            title="Final Score"
                            numerator={submissionById.score}
                            denominator={100}
                            colorCode="#1E3A8A"
                        />
                        <ScoreBar
                            title="Correct Answer"
                            numerator={correctAnswerCount}
                            denominator={submissionById.answers.length}
                            colorCode="#10B981"
                        />
                        <ScoreBar
                            title="Wrong Answer"
                            numerator={
                                submissionById.answers.length -
                                correctAnswerCount
                            }
                            denominator={submissionById.answers.length}
                            colorCode="#DC2626"
                        />
                    </div>
                    <AnswerList
                        questions={submissionById.quiz.questions}
                        answers={submissionById.answers}
                    />
                </div>
            </div>
        </>
    );
};

export default ScoreReport;
