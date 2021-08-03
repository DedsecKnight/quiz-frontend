import DifficultyBadge from "../badges/DifficultyBadge";
import CategoryBadge from "../badges/CategoryBadge";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ErrorComponent from "../error/Error";
import { ITEM_PER_PAGE } from "../utilities/constants";
import Loading from "../utilities/Loading";
import NoDataFound from "../utilities/NoDataFound";

const GET_SUBMISSIONS = gql`
    query GetSubmissionsByPage($limit: Float!, $offset: Float!) {
        mySubmissions(limit: $limit, offset: $offset) {
            id
            quiz {
                quizName
                difficulty {
                    type
                }
                category {
                    categoryName
                }
            }
            score
        }
    }
`;

interface QueryData {
    mySubmissions: Array<{
        id: number;
        quiz: {
            quizName: string;
            difficulty: {
                type: string;
            };
            category: {
                categoryName: string;
            };
        };
        score: number;
    }>;
}

interface Props {
    currentPage: number;
}

const SubmissionList: React.FC<Props> = ({ currentPage }) => {
    const { loading, error, data } = useQuery<
        QueryData,
        {
            limit: number;
            offset: number;
        }
    >(GET_SUBMISSIONS, {
        variables: {
            limit: ITEM_PER_PAGE,
            offset: currentPage * ITEM_PER_PAGE,
        },
    });

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;

    if (!data) return <NoDataFound />;

    const { mySubmissions } = data;

    return (
        <div className="my-6">
            {mySubmissions.map((submission, idx: number) => (
                <div
                    key={idx}
                    className="flex flex-row items-center justify-between p-4 my-2 border-2 border-gray-200 rounded-lg"
                >
                    <div className="flex flex-row items-center">
                        <div className="px-4">
                            <h1 className="text-xl lg:text-3xl text-blue-500">
                                {submission.id}
                            </h1>
                        </div>
                        <div className="ml-5">
                            <h1 className="text-blue-900 font-medium">
                                {submission.quiz.quizName}
                            </h1>
                            <p className="text-blue-500">
                                Score: {submission.score}
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:flex-row">
                        <DifficultyBadge
                            difficulty={submission.quiz.difficulty.type}
                        />
                        <CategoryBadge
                            categoryName={submission.quiz.category.categoryName}
                        />
                    </div>
                    <Link
                        className="border-blue-500 border py-2 px-4 rounded-xl text-blue-500 hover:bg-blue-400 hover:text-white hover:border-0 transition ease-in-out duration-300"
                        to={`/score-report/${submission.id}`}
                    >
                        Click for more details
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default SubmissionList;
