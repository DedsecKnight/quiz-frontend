import Card from "./Card";
import PerformanceChart from "./PerformanceChart";
import Profile from "./Profile";

import { gql, useQuery } from "@apollo/client";
import ErrorComponent from "../error/Error";
import { POLL_INTERVAL } from "../utilities/constants";
import NoDataFound from "../utilities/NoDataFound";
import Loading from "../utilities/Loading";

const GET_SCORE = gql`
    query GetUserScore {
        myScore {
            maxScore
            totalScore
        }
    }
`;

interface QueryData {
    myScore: {
        maxScore: number;
        totalScore: number;
    };
}

const MyStats: React.FC = () => {
    const { loading, error, data } = useQuery<QueryData>(GET_SCORE, {
        pollInterval: POLL_INTERVAL,
    });

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;
    if (!data) return <NoDataFound />;

    const { myScore } = data;

    return (
        <div className="my-7 flex flex-col-reverse items-center gap-y-7 lg:flex-row rounded-lg">
            <div className="flex flex-col justify-between w-full md:w-4/5 px-7 lg:border-r lg:w-7/12">
                <div className="my-stat-header border-b-2 pb-5">
                    <h1 className="font-bold text-center lg:text-left text-3xl text-blue-900">
                        My Statistics
                    </h1>
                    <p className="text-center lg:text-left text-indigo-400">
                        Check out your performance in recent quizzes
                    </p>
                </div>
                <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5 mt-6">
                    <Card
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                viewBox="0 0 20 20"
                                fill="#10B981"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                        title="Total Score"
                        data={myScore.totalScore}
                    />
                    <Card
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                viewBox="0 0 20 20"
                                fill="#DC2626"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                        title="Highest Score"
                        data={myScore.maxScore}
                    />
                </div>
                <div className="my-6 rounded-xl mx-auto p-8 w-full shadow-lg border-2">
                    <PerformanceChart />
                </div>
            </div>
            <div className="w-4/5 lg:w-5/12">
                <Profile />
            </div>
        </div>
    );
};

export default MyStats;
