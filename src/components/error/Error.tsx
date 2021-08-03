import { ApolloError } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { logout } from "../utilities/logout";
import { FORBIDDEN, RESOURCE_NOT_FOUND } from "./errorCode";

interface Props {
    error: ApolloError;
}

const ErrorComponent: React.FC<Props> = ({ error }) => {
    if (error.networkError) return <Redirect to="/500" />;
    if (
        error.graphQLErrors.filter(
            (errorObject) => errorObject.extensions!.code === "UNAUTHENTICATED"
        ).length > 0
    ) {
        logout();
        return <Redirect to="/login" />;
    } else if (
        error.graphQLErrors.filter(
            (errorObject) => errorObject.extensions!.code === RESOURCE_NOT_FOUND
        ).length > 0
    )
        return <div>Oops, what you seems to be looking for does not exist</div>;
    else if (
        error.graphQLErrors.filter(
            (errorObject) => errorObject.extensions!.code === FORBIDDEN
        ).length > 0
    )
        return <div>Oops, you are not allowed to access this information</div>;
    console.log(error.graphQLErrors);

    return <div></div>;
};

export default ErrorComponent;
