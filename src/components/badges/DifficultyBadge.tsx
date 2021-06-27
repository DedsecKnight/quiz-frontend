interface Props {
    difficulty: string;
}

const DifficultyBadge: React.FC<Props> = ({ difficulty }) => {
    const badgeColor =
        difficulty === "Hard"
            ? "bg-red-600"
            : difficulty === "Normal"
            ? "bg-yellow-500"
            : "bg-green-500";
    return (
        <div className={`mr-3 py-1 px-2 ${badgeColor} text-white rounded-lg`}>
            {difficulty}
        </div>
    );
};

export default DifficultyBadge;
