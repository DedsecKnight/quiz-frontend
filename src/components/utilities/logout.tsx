import { AUTH_KEY, REFRESH_AUTH_KEY } from "../../constants";
import { client } from "../../graphql/client";

export const logout = async (): Promise<boolean> => {
    await client.clearStore().catch((err) => {
        console.log(err);
        return false;
    });
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(REFRESH_AUTH_KEY);
    return true;
};
