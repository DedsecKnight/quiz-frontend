import SearchBox from "./SearchBox";
import QuizList from "./QuizList";
import Pagination from "./Pagination";
import { gql, useQuery } from "@apollo/client";
import { injectClass } from "../utilities/inject-class";
import ErrorComponent from "../error/Error";
import { useState } from "react";
import { POLL_INTERVAL, ITEM_PER_PAGE } from "../utilities/constants";
import Loading from "../utilities/Loading";
import NoDataFound from "../utilities/NoDataFound";

const GET_QUIZ_COUNT = gql`
    query GetQuizCount {
        countAllQuizzes {
            count
        }
    }
`;

interface QueryData {
    countAllQuizzes: {
        count: number;
    };
}

const BrowseQuiz = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const { loading, data, error } = useQuery<QueryData>(GET_QUIZ_COUNT, {
        pollInterval: POLL_INTERVAL,
    });

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;

    if (!data) return <NoDataFound />;

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
                            Browse Quiz
                        </h1>
                        <p className="text-center lg:text-left text-indigo-400">
                            Let's solve some quizzes
                        </p>
                    </div>
                    <SearchBox />
                    <QuizList currentPage={currentPage} />
                    <Pagination
                        numPages={Math.ceil(
                            data.countAllQuizzes.count / ITEM_PER_PAGE
                        )}
                        currentPage={currentPage}
                        updatePage={(pageNumber) => {
                            setCurrentPage(pageNumber);
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default BrowseQuiz;
