import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_KEY, REFRESH_AUTH_KEY } from "../constants";

const httpLink = createHttpLink({
    uri: "http://localhost:5000",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_KEY);
    const refreshToken = localStorage.getItem(REFRESH_AUTH_KEY);

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
            refreshToken: refreshToken || "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
