import { getQuizzes } from "../../graphql/query/getQuizzes";
import DifficultyBadge from "../badges/DifficultyBadge";
import CategoryBadge from "../badges/CategoryBadge";
import { useQuery } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { checkError } from "../error/checkError";
import { QuizData } from "./interfaces";

const QuizList = () => {
    const { error, data } = useQuery<QuizData>(getQuizzes);
    const history = useHistory();

    if (error) {
        checkError(history, error);
        return <div></div>;
    }

    if (data)
        return (
            <div className="my-6">
                {data.quizzes.map((quiz, idx: number) => (
                    <div
                        key={idx}
                        className="flex flex-row items-center justify-between p-4 my-2 border-2 border-gray-200 rounded-lg"
                    >
                        <div className="flex flex-row items-center">
                            <div className="px-4">
                                <h1 className="text-xl lg:text-3xl text-blue-500">
                                    {idx + 1}
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
                            <DifficultyBadge
                                difficulty={quiz.difficulty.type}
                            />
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

    return <div>Loading</div>;
};

export default QuizList;
