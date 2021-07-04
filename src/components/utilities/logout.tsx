import { Redirect } from "react-router-dom";
import { AUTH_KEY, REFRESH_AUTH_KEY } from "../../constants";

export const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(REFRESH_AUTH_KEY);
    return <Redirect to="/login" />;
};
