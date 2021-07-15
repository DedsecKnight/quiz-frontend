const Footer = () => {
    return (
        <div className="p-10 flex flex-col gap-y-4 md:flex-row justify-between items-center border-t">
            <h1 className="text-xl">Technologies used in this project</h1>
            <div className="flex gap-x-4">
                <a
                    href="https://www.typescriptlang.org/docs/"
                    className="text-blue-700 hover:text-blue-900"
                >
                    TypeScript
                </a>
                <a
                    href="https://graphql.org/"
                    className="text-blue-700 hover:text-blue-900"
                >
                    GraphQL
                </a>
                <a
                    href="https://reactjs.org/"
                    className="text-blue-700 hover:text-blue-900"
                >
                    React
                </a>
                <a
                    href="https://tailwindcss.com/"
                    className="text-blue-700 hover:text-blue-900"
                >
                    TailwindCSS
                </a>
            </div>
        </div>
    );
};

export default Footer;
