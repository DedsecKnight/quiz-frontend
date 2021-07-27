import DifficultyBadge from "../badges/DifficultyBadge";
import CategoryBadge from "../badges/CategoryBadge";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ErrorComponent from "../error/Error";
import { ITEM_PER_PAGE } from "../utilities/constants";
import Loading from "../utilities/Loading";
import NoDataFound from "../utilities/NoDataFound";

const GET_QUIZ = gql`
    query GetQuizByPage($limit: Float!, $offset: Float!, $query: String!) {
        quizzes(limit: $limit, offset: $offset, query: $query) {
            id
            quizName
            author {
                name
            }
            difficulty {
                type
            }
            category {
                categoryName
            }
        }
    }
`;

interface QueryData {
    quizzes: Array<{
        id: number;
        quizName: string;
        author: {
            name: string;
        };
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
    searchQuery: string;
}

const QuizList: React.FC<Props> = ({ currentPage, searchQuery }) => {
    const { loading, error, data } = useQuery<
        QueryData,
        {
            limit: number;
            offset: number;
            query: string;
        }
    >(GET_QUIZ, {
        variables: {
            limit: ITEM_PER_PAGE,
            offset: currentPage * ITEM_PER_PAGE,
            query: searchQuery,
        },
    });

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;

    if (!data) return <NoDataFound />;

    const { quizzes } = data;

    return (
        <div className="my-6">
            {quizzes.map((quiz, idx: number) => (
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
                            <p className="text-blue-500">
                                Created by {quiz.author.name}
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:flex-row">
                        <DifficultyBadge difficulty={quiz.difficulty.type} />
                        <CategoryBadge
                            categoryName={quiz.category.categoryName}
                        />
                    </div>
                    <Link
                        className="border-blue-500 border py-2 px-4 rounded-xl text-blue-500 hover:bg-blue-400 hover:text-white hover:border-0 transition ease-in-out duration-300"
                        to={`/start-quiz/${quiz.id}/ready`}
                    >
                        Click to begin
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default QuizList;
