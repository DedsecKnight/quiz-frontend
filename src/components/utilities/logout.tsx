import { Redirect } from "react-router-dom";
import { AUTH_KEY, REFRESH_AUTH_KEY } from "../../constants";
import { client } from "../../graphql/client";

export const logout = async () => {
    await client.resetStore().catch((err) => {
        console.log(err);
        return <Redirect to="/500" />;
    });
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(REFRESH_AUTH_KEY);
    return <Redirect to="/login" />;
};
