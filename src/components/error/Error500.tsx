import { useEffect } from "react";
import { AUTH_KEY, REFRESH_AUTH_KEY } from "../../constants";

const Error500 = () => {
    useEffect(() => {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(REFRESH_AUTH_KEY);
    }, []);

    return (
        <div>
            Oops, our server is currently down at the moment. Please try again
            later
        </div>
    );
};

export default Error500;
