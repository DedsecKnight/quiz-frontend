import StatCard from "./StatCard";
import QuizCard from "./QuizCard";
import { injectClass } from "../utilities/inject-class";
import { gql, useQuery } from "@apollo/client";
import { checkError } from "../error/checkError";
import { useHistory } from "react-router-dom";

const GET_USER_INFO = gql`
    query GetUserInfo($recentSubmissionLimit: Float!) {
        myInfo {
            name
        }
        countMySubmissions {
            count
        }
        countMyQuizzes {
            count
        }
        myRecentSubmissionsLimit(limit: $recentSubmissionLimit) {
            score
            quiz {
                quizName
                difficulty {
                    type
                }
            }
        }
    }
`;

interface QueryData {
    myInfo: {
        name: string;
    };
    countMySubmissions: {
        count: number;
    };
    countMyQuizzes: {
        count: number;
    };
    myRecentSubmissionsLimit: Array<{
        score: number;
        quiz: {
            quizName: string;
            difficulty: {
                type: string;
            };
        };
    }>;
}

const Profile = () => {
    const history = useHistory();

    const { loading, data, error } = useQuery<
        QueryData,
        {
            recentSubmissionLimit: number;
        }
    >(GET_USER_INFO, {
        variables: {
            recentSubmissionLimit: 3,
        },
    });

    if (loading) return <div>Loading</div>;

    if (error) {
        checkError(history, error);
        return <div></div>;
    }

    if (!data) {
        console.log("Profile did not receive data");
        return <div>No data found</div>;
    }

    const {
        countMyQuizzes,
        myRecentSubmissionsLimit,
        myInfo,
        countMySubmissions,
    } = data;

    return (
        <div className="flex flex-col justify-between mb-6 md:mb-0">
            <div
                className="block md:hidden cursor-pointer"
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
            <div className="w-1/2 h-1/2 mx-auto">
                <div className="profile-pic">
                    <img
                        className="rounded-full border border-gray-100 shadow-sm mx-auto"
                        src="https://randomuser.me/api/portraits/women/81.jpg"
                        alt="user"
                    />
                </div>
                <div className="mt-5">
                    <h1 className="text-3xl font-medium text-blue-900 text-center">
                        {myInfo.name}
                    </h1>
                    <p className="text-lg text-center text-indigo-400 mt-2">
                        @{myInfo.name}
                    </p>
                </div>
            </div>
            <div className="flex flex-col mt-5 gap-y-4">
                <StatCard
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#2563EB"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    }
                    title="Quiz written"
                    data={countMyQuizzes.count}
                />
                <StatCard
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#2563EB"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                    title="Quiz submissions"
                    data={countMySubmissions.count}
                />
            </div>
            <div className="flex flex-col mt-6 gap-y-4">
                <div className="flex flex-row justify-between w-full lg:w-4/5 mx-auto pt-3">
                    <p className="text-blue-900">Recent Quizzes</p>
                    <p className="text-right xl:text-left text-indigo-400 cursor-pointer hover:text-indigo-600">
                        View all my taken quizzes
                    </p>
                </div>
                {myRecentSubmissionsLimit.length > 0 ? (
                    myRecentSubmissionsLimit.map((obj, idx: number) => (
                        <QuizCard
                            key={idx}
                            difficulty={obj.quiz.difficulty.type}
                            name={obj.quiz.quizName}
                            score={obj.score}
                        />
                    ))
                ) : (
                    <h1 className="text-center p-6">
                        You haven't taken any quizzes
                    </h1>
                )}
            </div>
        </div>
    );
};

export default Profile;
