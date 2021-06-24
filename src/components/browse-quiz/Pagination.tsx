interface Props {
    numPages: number;
}

const Pagination: React.FC<Props> = ({ numPages }) => {
    const pageList = [];

    for (let i = 0; i < numPages; i++) pageList.push(i);

    return (
        <div className="flex flex-row justify-between px-8">
            <button
                type="button"
                className="bg-gray-400 py-2 px-8 text-white rounded-lg"
            >
                Previous
            </button>
            {pageList.map((num) => (
                <button
                    className="border-2 border-gray-100 py-2 px-4 hover:border-purple-400 rounded-lg"
                    type="button"
                    key={num}
                >
                    {num + 1}
                </button>
            ))}
            <button
                className="bg-blue-500 px-8 py-2 text-white rounded-lg"
                type="button"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
