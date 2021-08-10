import { ApolloError } from "@apollo/client";
import { Redirect, useHistory } from "react-router-dom";
import { logout } from "../utilities/logout";
import Error401 from "./Error401";
import Error404 from "./Error404";
import { FORBIDDEN, RESOURCE_NOT_FOUND } from "./errorCode";

interface Props {
    error: ApolloError;
}

const ErrorComponent: React.FC<Props> = ({ error }) => {
    const history = useHistory();
    if (error.networkError) return <Redirect to="/500" />;
    if (
        error.graphQLErrors.filter(
            (errorObject) => errorObject.extensions!.code === "UNAUTHENTICATED"
        ).length > 0
    ) {
        logout().then(() => {
            history.push("/login");
        });
    } else if (
        error.graphQLErrors.filter(
            (errorObject) => errorObject.extensions!.code === RESOURCE_NOT_FOUND
        ).length > 0
    )
        return (
            <Error404 message="Oops, what you seems to be looking for does not exist" />
        );
    else if (
        error.graphQLErrors.filter(
            (errorObject) => errorObject.extensions!.code === FORBIDDEN
        ).length > 0
    )
        return (
            <Error401 message="Oops, you are not allowed to access this information" />
        );
    console.log(error.graphQLErrors);

    return <div></div>;
};

export default ErrorComponent;
