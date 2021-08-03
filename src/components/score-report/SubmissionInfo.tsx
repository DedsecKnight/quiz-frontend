import CategoryBadge from "../badges/CategoryBadge";
import DifficultyBadge from "../badges/DifficultyBadge";

interface Props {
    quizName: string;
    authorName: string;
    category: string;
    difficulty: string;
}

const SubmissionInfo: React.FC<Props> = ({
    quizName,
    authorName,
    category,
    difficulty,
}) => {
    return (
        <div className="flex flex-col justify-between gap-y-6 m-6 border-2 rounded-2xl p-6">
            <div className="mb-4">
                <h1 className="text-blue-900 text-xl">Quiz Name: {quizName}</h1>
                <h1 className="text-lg text-indigo-400">
                    Submission Author: {authorName}
                </h1>
            </div>
            <div className="flex flex-row">
                <DifficultyBadge difficulty={difficulty} />
                <CategoryBadge categoryName={category} />
            </div>
        </div>
    );
};

export default SubmissionInfo;
