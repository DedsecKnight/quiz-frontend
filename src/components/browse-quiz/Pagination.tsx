interface Props {
    numPages: number;
    currentPage: number;
    updatePage: (pageNumber: number) => void;
}

const Pagination: React.FC<Props> = ({ numPages, currentPage, updatePage }) => {
    const pageList = [];

    for (let i = 0; i < numPages; i++) pageList.push(i);

    return (
        <div className="flex flex-row justify-between px-8">
            <button
                type="button"
                className="bg-gray-400 py-2 px-8 text-white rounded-lg"
                disabled={currentPage === 0}
                onClick={() => {
                    updatePage(currentPage - 1);
                }}
            >
                Previous
            </button>
            <div className="flex flex-row gap-x-2">
                {pageList.map((num) => (
                    <button
                        className={`ring-0 focus:outline-none ${
                            num !== currentPage
                                ? "border-2 border-gray-100 hover:border-purple-400"
                                : "bg-blue-400 text-white"
                        } py-2 px-4 rounded-lg`}
                        type="button"
                        key={num}
                        onClick={() => {
                            updatePage(num);
                        }}
                    >
                        {num + 1}
                    </button>
                ))}
            </div>
            <button
                className="bg-blue-500 px-8 py-2 text-white rounded-lg"
                type="button"
                disabled={currentPage === numPages - 1}
                onClick={() => {
                    updatePage(currentPage + 1);
                }}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
