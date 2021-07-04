import { ApolloError } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { logout } from "../utilities/logout";

interface Props {
    error: ApolloError;
}

const ErrorComponent: React.FC<Props> = ({ error }) => {
    if (error.networkError) return <Redirect to="/500" />;
    else if (
        error.graphQLErrors.filter(
            (errorObject) => errorObject.extensions!.code === "UNAUTHENTICATED"
        ).length > 0
    ) {
        return logout();
    } else console.log(error.graphQLErrors);

    return <div></div>;
};

export default ErrorComponent;
