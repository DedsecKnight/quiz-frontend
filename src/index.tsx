import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";

ReactDOM.render(
    <Router>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Router>,
    document.getElementById("root")
);
