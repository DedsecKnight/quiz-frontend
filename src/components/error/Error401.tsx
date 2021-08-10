import { Link } from "react-router-dom";

interface Props {
    message: string;
}

const Error401: React.FC<Props> = ({ message }) => {
    return (
        <div className="w-full p-10">
            <div className="container mx-auto flex flex-col gap-y-3 p-4">
                <h1 className="text-center text-regular text-blue-900 text-3xl">
                    401 - Unauthorized
                </h1>
                <h1 className="text-center">{message}</h1>
                <Link
                    className="mx-auto bg-gray-200 p-3 rounded-lg hover:bg-gray-300"
                    to="/"
                >
                    Return to My Stats
                </Link>
            </div>
        </div>
    );
};

export default Error401;
