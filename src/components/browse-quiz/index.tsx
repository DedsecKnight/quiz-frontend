import SearchBox from "./SearchBox";
import QuizList from "./QuizList";
import Pagination from "./Pagination";
import { useQuery } from "@apollo/client";
import { getQuizzes } from "../../graphql/query/getQuizzes";
import { AUTH_KEY } from "../../constants";

const BrowseQuiz = () => {
    const injectClass = () => {
        var getNavbar = document.querySelector(".navbar");
        if (getNavbar?.classList.contains("hidden")) {
            getNavbar?.classList.remove("hidden");
            getNavbar?.classList.remove("md:block");

            getNavbar?.classList.add("block");
        } else {
            getNavbar?.classList.add("hidden");
            getNavbar?.classList.add("md:block");

            getNavbar?.classList.remove("block");
        }
    };

    const { data, error } = useQuery(getQuizzes, {
        errorPolicy: "all",
    });

    if (error) {
        if (
            error.graphQLErrors.filter(
                (obj) =>
                    obj.extensions && obj.extensions.code === "UNAUTHENTICATED"
            ).length !== 0
        ) {
            localStorage.removeItem(AUTH_KEY);
        }
        return <div>{error.graphQLErrors}</div>;
    }

    if (data)
        return (
            <>
                <div
                    className="block md:hidden cursor-pointer p-4"
                    onClick={(e) => injectClass()}
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
                                Check out your performance in recent quizzes
                            </p>
                        </div>
                        <SearchBox />
                        <QuizList />
                        <Pagination
                            numPages={Math.ceil(data.quizzes.length / 5)}
                        />
                    </div>
                </div>
            </>
        );
    return <div>Loading</div>;
};

export default BrowseQuiz;
