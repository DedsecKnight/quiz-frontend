import { ApolloError } from "@apollo/client";
import { History } from "history";
import { AUTH_KEY } from "../../constants";

export const checkError = (
    history: History<unknown>,
    error: ApolloError | undefined
) => {
    if (!error) return;
    if (error.networkError) history.push("/500");
    if (
        error.graphQLErrors.filter(
            (obj) => obj.extensions && obj.extensions.code === "UNAUTHENTICATED"
        ).length !== 0
    ) {
        localStorage.removeItem(AUTH_KEY);
        history.push("/login");
    } else {
        const otherError = error.graphQLErrors;

        if (otherError.length !== 0) {
            history.push({
                pathname: "/404",
                state: {
                    message: otherError[0].message,
                },
            });
        }
    }
};
