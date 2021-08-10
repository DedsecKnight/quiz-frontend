import { useEffect } from "react";
import { AUTH_KEY, REFRESH_AUTH_KEY } from "../../constants";

const Error500 = () => {
    useEffect(() => {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(REFRESH_AUTH_KEY);
    }, []);

    return (
        <div className="w-full p-10">
            <div className="container mx-auto flex flex-col gap-y-3 p-4">
                <h1 className="text-center text-regular text-blue-900 text-3xl">
                    500 - Server Error
                </h1>
                <h1 className="text-center">
                    Oops, our server is currently down at the moment. Please try
                    again later
                </h1>
            </div>
        </div>
    );
};

export default Error500;
