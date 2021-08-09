import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import ErrorComponent from "../error/Error";
import { ITEM_PER_PAGE } from "../utilities/constants";
import Hamburger from "../utilities/Hamburger";
import Loading from "../utilities/Loading";
import NoDataFound from "../utilities/NoDataFound";
import Pagination from "./Pagination";
import QuizList from "./QuizList";

const QUIZ_COUNT = gql`
    query GetQuizCount {
        countMyQuizzes {
            count
        }
    }
`;

interface QueryData {
    countMyQuizzes: {
        count: number;
    };
}

const MyQuizzes = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const { loading, data, error } = useQuery<QueryData>(QUIZ_COUNT);

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;
    if (!data) return <NoDataFound />;

    const { countMyQuizzes } = data;

    return (
        <>
            <Hamburger />
            <div className="my-7 flex flex-col-reverse items-center gap-y-7 lg:flex-row rounded-lg">
                <div className="flex flex-col justify-between w-full px-7">
                    <div className="my-stat-header border-b-2 pb-5">
                        <h1 className="font-bold text-center lg:text-left text-3xl text-blue-900">
                            My Quizzes
                        </h1>
                        <p className="text-center lg:text-left text-indigo-400">
                            Manage your quizzes here
                        </p>
                    </div>
                    {countMyQuizzes.count > 0 ? (
                        <>
                            <QuizList currentPage={currentPage} />
                            <Pagination
                                numPages={Math.ceil(
                                    countMyQuizzes.count / ITEM_PER_PAGE
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
                                You haven't created any quizzes
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyQuizzes;
