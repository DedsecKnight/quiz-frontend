import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import ErrorComponent from "../error/Error";
import { ITEM_PER_PAGE } from "../utilities/constants";
import Hamburger from "../utilities/Hamburger";
import Loading from "../utilities/Loading";
import NoDataFound from "../utilities/NoDataFound";
import Pagination from "./Pagination";
import SubmissionList from "./SubmissionList";

const SUBMISSION_COUNT = gql`
    query GetSubmissionCount {
        countMySubmissions {
            count
        }
    }
`;

interface QueryData {
    countMySubmissions: {
        count: number;
    };
}

const MySubmissions = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const { loading, data, error } = useQuery<QueryData>(SUBMISSION_COUNT);

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;
    if (!data) return <NoDataFound />;

    const { countMySubmissions } = data;

    return (
        <>
            <Hamburger />
            <div className="my-7 flex flex-col-reverse items-center gap-y-7 lg:flex-row rounded-lg">
                <div className="flex flex-col justify-between w-full px-7">
                    <div className="my-stat-header border-b-2 pb-5">
                        <h1 className="font-bold text-center lg:text-left text-3xl text-blue-900">
                            My Submissions
                        </h1>
                        <p className="text-center lg:text-left text-indigo-400">
                            Reflect upon your past performances
                        </p>
                    </div>
                    {countMySubmissions.count > 0 ? (
                        <>
                            <SubmissionList currentPage={currentPage} />
                            <Pagination
                                numPages={Math.ceil(
                                    countMySubmissions.count / ITEM_PER_PAGE
                                )}
                                currentPage={currentPage}
                                updatePage={(pageNumber) => {
                                    setCurrentPage(pageNumber);
                                }}
                            />
                        </>
                    ) : (
                        <div className="w-full p-6">
                            <h1 className="text-center text-xl text-medium">
                                No quizzes found
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MySubmissions;
