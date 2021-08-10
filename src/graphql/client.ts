import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_KEY, REFRESH_AUTH_KEY } from "../constants";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
    uri: "http://localhost:5000",
});

// const errorLink = onError(({ networkError, graphQLErrors }) => {
//     console.log("Error occurred");
//     if (graphQLErrors) {
//         graphQLErrors.forEach((err) => {
//             console.log(err);
//         });
//     }
//     if (networkError) console.log(networkError);
// });

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
    // link: authLink.concat(errorLink).concat(httpLink),
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
