import SearchBox from "./SearchBox";
import QuizList from "./QuizList";
import Pagination from "./Pagination";
import { gql, useQuery } from "@apollo/client";
import ErrorComponent from "../error/Error";
import { useEffect, useState } from "react";
import { POLL_INTERVAL, ITEM_PER_PAGE } from "../utilities/constants";
import Loading from "../utilities/Loading";
import NoDataFound from "../utilities/NoDataFound";
import Hamburger from "../utilities/Hamburger";

const GET_QUIZ_COUNT = gql`
    query GetQuizCount($query: String!) {
        countQuizzes(query: $query) {
            count
        }
    }
`;

interface QueryData {
    countQuizzes: {
        count: number;
    };
}

const BrowseQuiz = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [queryParam, setQueryParam] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const { loading, data, error } = useQuery<
        QueryData,
        {
            query: string;
        }
    >(GET_QUIZ_COUNT, {
        pollInterval: POLL_INTERVAL,
        variables: {
            query: queryParam,
        },
    });

    useEffect(() => {
        let timer = setTimeout(() => {
            setQueryParam(searchQuery);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;

    if (!data) return <NoDataFound />;

    return (
        <>
            <Hamburger />
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
                    <SearchBox
                        searchQuery={searchQuery}
                        setQuery={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                    {data.countQuizzes.count > 0 ? (
                        <>
                            <QuizList
                                currentPage={currentPage}
                                searchQuery={queryParam}
                            />
                            <Pagination
                                numPages={Math.ceil(
                                    data.countQuizzes.count / ITEM_PER_PAGE
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

export default BrowseQuiz;
