import DifficultyBadge from "../badges/DifficultyBadge";
import CategoryBadge from "../badges/CategoryBadge";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ErrorComponent from "../error/Error";
import { ITEM_PER_PAGE } from "../utilities/constants";
import Loading from "../utilities/Loading";
import NoDataFound from "../utilities/NoDataFound";
import { useState } from "react";
import Modal from "./Modal";

const GET_QUIZZES = gql`
    query GetQuizzesByPage($limit: Float!, $offset: Float!) {
        myQuizzes(limit: $limit, offset: $offset) {
            id
            quizName
            difficulty {
                type
            }
            category {
                categoryName
            }
        }
    }
`;

const DELETE_QUIZ = gql`
    mutation DeleteQuiz($quizId: Float!) {
        removeQuiz(quizId: $quizId) {
            statusCode
            message
        }
    }
`;

interface QueryData {
    myQuizzes: Array<{
        id: string;
        quizName: string;
        difficulty: {
            type: string;
        };
        category: {
            categoryName: string;
        };
    }>;
}

interface Props {
    currentPage: number;
}

const QuizList: React.FC<Props> = ({ currentPage }) => {
    const { loading, error, data } = useQuery<
        QueryData,
        {
            limit: number;
            offset: number;
        }
    >(GET_QUIZZES, {
        variables: {
            limit: ITEM_PER_PAGE,
            offset: currentPage * ITEM_PER_PAGE,
        },
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(-1);

    const [deleteQuiz] = useMutation<
        {
            removeQuiz: {
                statusCode: number;
                message: string;
            };
        },
        {
            quizId: number;
        }
    >(DELETE_QUIZ, {
        variables: {
            quizId: modalIndex,
        },
        onCompleted: () => {
            setShowDeleteModal(false);
        },
    });

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;

    if (!data) return <NoDataFound />;

    const { myQuizzes } = data;

    return (
        <div className="my-6">
            {myQuizzes.map((quiz, idx: number) => (
                <div
                    key={idx}
                    className="flex flex-row items-center justify-between p-4 my-2 border-2 border-gray-200 rounded-lg"
                >
                    <div className="flex flex-row items-center">
                        <div className="px-4">
                            <h1 className="text-xl lg:text-3xl text-blue-500">
                                {quiz.id}
                            </h1>
                        </div>
                        <div className="ml-5">
                            <h1 className="text-blue-900 font-medium">
                                {quiz.quizName}
                            </h1>
                            {/* <p className="text-blue-500">
                                Score: {submission.score}
                            </p> */}
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:flex-row">
                        <DifficultyBadge difficulty={quiz.difficulty.type} />
                        <CategoryBadge
                            categoryName={quiz.category.categoryName}
                        />
                    </div>
                    <div className="flex flex-row gap-x-2">
                        <Link
                            className="border-blue-500 border py-2 px-4 rounded-xl text-blue-500 hover:bg-blue-400 hover:text-white hover:border-0 transition ease-in-out duration-300"
                            to={`/edit-quiz/${quiz.id}`}
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => {
                                setModalIndex(parseInt(quiz.id));
                                setShowDeleteModal((prev) => !prev);
                            }}
                            className="border-red-600 border py-2 px-4 rounded-xl text-red-600 hover:bg-red-400 hover:text-white hover:border-0 transition ease-in-out duration-300"
                        >
                            Delete
                        </button>
                        {showDeleteModal && (
                            <Modal
                                setShowModal={(showModal) => {
                                    setShowDeleteModal(showModal);
                                }}
                                modalAction={() => {
                                    deleteQuiz();
                                }}
                                message={
                                    "Are you sure you want to delete this quiz?"
                                }
                                modalTitle="Delete Quiz"
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuizList;
