const Footer = () => {
    return (
        <div className="p-10 flex flex-col gap-y-4 md:flex-row justify-between items-center border-t">
            <h1 className="text-xl">Technologies used in this project</h1>
            <div className="flex gap-x-4">
                <button
                    type="button"
                    className="text-blue-700 hover:text-blue-900"
                >
                    TypeScript
                </button>
                <button
                    type="button"
                    className="text-blue-700 hover:text-blue-900"
                >
                    GraphQL
                </button>
                <button
                    type="button"
                    className="text-blue-700 hover:text-blue-900"
                >
                    React
                </button>
                <button
                    type="button"
                    className="text-blue-700 hover:text-blue-900"
                >
                    TailwindCSS
                </button>
            </div>
        </div>
    );
};

export default Footer;
