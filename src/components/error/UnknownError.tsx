import { ApolloError } from "@apollo/client";

interface Props {
    error: ApolloError;
}

const UnknownError: React.FC<Props> = ({ error }) => {
    return (
        <div className="w-4/5 mx-auto my-4 flex flex-col gap-y-3">
            {error.graphQLErrors.map((errorObj, idx) => (
                <div
                    key={idx}
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <span className="block sm:inline">{errorObj.message}</span>
                </div>
            ))}
        </div>
    );
};

export default UnknownError;
