import NavItem from "./NavItem";
import { useHistory } from "react-router";
import { injectClass } from "../utilities/inject-class";
import { AUTH_KEY, REFRESH_AUTH_KEY } from "../../constants";
import { client } from "../../graphql/client";

interface Props {
    active: string;
}

const NavBar: React.FC<Props> = ({ active }) => {
    const history = useHistory();

    return (
        <div className="bg-blue-900 flex flex-col items-center justify-between h-screen sticky top-0">
            <div className="flex flex-row justify-between items-center w-full px-8 py-5">
                <div className="items-center flex flex-row">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <h1 className="w-full ml-6 text-white text-3xl text-medium">
                        Quiz?
                    </h1>
                </div>
                <div
                    className="md:hidden text-white text-xl cursor-pointer"
                    onClick={() => injectClass()}
                >
                    X
                </div>
            </div>
            <div className="w-full">
                <NavItem
                    action={() => {
                        history.push("/");
                    }}
                    active={active === "/"}
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={active === "/" ? "black" : "white"}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                        </svg>
                    }
                    title="Statistics"
                />

                <NavItem
                    action={() => {
                        history.push("/create-quiz");
                    }}
                    active={active === "/create-quiz"}
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={
                                active === "/create-quiz" ? "black" : "white"
                            }
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    }
                    title="Create Quiz"
                />
                <NavItem
                    active={active === "/browse-quiz"}
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={
                                active === "/browse-quiz" ? "black" : "white"
                            }
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                            />
                        </svg>
                    }
                    title="Browse Quiz"
                    action={() => {
                        history.push("/browse-quiz");
                    }}
                />
                <NavItem
                    action={() => {
                        history.push("/settings");
                    }}
                    active={active === "/settings"}
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={active === "/settings" ? "black" : "white"}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    }
                    title="Settings"
                />
            </div>
            <div className="w-full">
                <NavItem
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    }
                    title="Logout"
                    action={() => {
                        client
                            .resetStore()
                            .then(() => {
                                localStorage.removeItem(AUTH_KEY);
                                localStorage.removeItem(REFRESH_AUTH_KEY);
                                history.push("/login");
                            })
                            .catch((err) => {
                                console.log(err);
                                history.push("/500");
                            });
                    }}
                />
            </div>
        </div>
    );
};

export default NavBar;
