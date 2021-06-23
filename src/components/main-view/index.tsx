import NavBar from "../navbar";
import MyStats from "../my-stats";
import "./index.css";

import { getUserInfo } from "../../graphql/query/user";
import { useQuery } from "@apollo/client";
import { AUTH_KEY } from "../../constants";

const MainView = () => {
    const { error, data } = useQuery(getUserInfo, {
        errorPolicy: "all",
    });

    if (error) {
        if (
            error.graphQLErrors.filter(
                (obj) =>
                    obj.extensions && obj.extensions.code === "UNAUTHENTICATED"
            ).length !== 0
        ) {
            localStorage.removeItem(AUTH_KEY);
        }
        return <div>{error.graphQLErrors}</div>;
    }

    return data ? (
        <div className="flex flex-col main-view h-screen relative">
            <div className="navbar w-full hidden md:block h-full">
                <NavBar />
            </div>
            <div className="w-full">
                <MyStats />
            </div>
        </div>
    ) : (
        <div>Loading</div>
    );
};

export default MainView;
