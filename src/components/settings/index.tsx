import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AUTH_KEY } from "../../constants";
import { checkError } from "../error/checkError";
import { injectClass } from "../utilities/inject-class";

interface FormType {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Settings = () => {
    const history = useHistory();

    const { error, data } = useQuery(gql`
        query GetUserData {
            myInfo {
                name
                email
                password
            }
        }
    `);

    checkError(history, error);

    const [formData, setFormData] = useState<FormType>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (!data) return;
        const { name, email } = data.myInfo;
        setFormData((prev) => ({
            ...prev,
            name,
            email,
        }));
    }, [data]);

    const update = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    if (error) {
        console.log(error);
        if (
            error.graphQLErrors.filter(
                (err) => err.extensions?.code === "UNAUTHENTICATED"
            ).length !== 0
        ) {
            localStorage.removeItem(AUTH_KEY);
            history.push("/login");
        }
        return <div>Error occurred</div>;
    }

    if (data) {
        return (
            <>
                <div
                    className="block md:hidden cursor-pointer p-4"
                    onClick={(e) => injectClass()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </div>
                <div className="my-7 flex flex-col-reverse items-center gap-y-7 lg:flex-row rounded-lg">
                    <div className="flex flex-col justify-between w-full px-7">
                        <div className="my-stat-header border-b-2 pb-5">
                            <h1 className="font-bold text-center lg:text-left text-3xl text-blue-900">
                                Settings
                            </h1>
                        </div>
                        <form onSubmit={(e) => submit(e)}>
                            <div className="p-6 lg:px-10 lg:py-6 flex flex-col">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="rounded-lg my-2"
                                    value={formData.name}
                                    onChange={(e) => update(e)}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="rounded-lg my-2"
                                    value={formData.email}
                                    onChange={(e) => update(e)}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="rounded-lg my-2"
                                    value={formData.password}
                                    onChange={(e) => update(e)}
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="rounded-lg my-2"
                                    value={formData.confirmPassword}
                                    onChange={(e) => update(e)}
                                />
                                <button
                                    type="submit"
                                    className="p-3 bg-purple-700 text-white rounded-lg"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }

    return <div>Loading</div>;
};

export default Settings;
