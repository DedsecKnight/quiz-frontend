import { History } from "history";
import { AUTH_KEY, REFRESH_AUTH_KEY } from "../../constants";

export const logout = (history: History) => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(REFRESH_AUTH_KEY);
    history.push("/login");
};
