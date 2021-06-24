import { useEffect } from "react";

const SearchBox = () => {
    useEffect(() => {
        document
            .querySelector(".search-input")
            ?.addEventListener("focus", () => {
                document
                    .querySelector(".searchbox")
                    ?.classList.remove("border-gray-200");
                document
                    .querySelector(".searchbox")
                    ?.classList.add("border-blue-400");
            });
        document
            .querySelector(".search-input")
            ?.addEventListener("focusout", () => {
                document
                    .querySelector(".searchbox")
                    ?.classList.remove("border-blue-400");
                document
                    .querySelector(".searchbox")
                    ?.classList.add("border-gray-200");
            });
    }, []);

    return (
        <div className="searchbox flex mt-4 flex-row items-center py-1 px-5 border-2 border-gray-200 rounded-3xl">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
            <input
                type="text"
                className="search-input flex-grow focus:ring-0 border-0"
                placeholder="Search for a quiz"
            />
        </div>
    );
};

export default SearchBox;
