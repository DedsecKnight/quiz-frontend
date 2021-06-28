import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_KEY } from "../constants";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
    uri: "http://localhost:5000",
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
    console.log("Error occurred");
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_KEY);

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache(),
});
