import { History } from "history";
import { AUTH_KEY } from "../../constants";

export const logout = (history: History) => {
    localStorage.removeItem(AUTH_KEY);
    history.push("/login");
};
