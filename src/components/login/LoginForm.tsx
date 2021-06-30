import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AUTH_KEY, REFRESH_AUTH_KEY } from "../../constants";
import { useHistory } from "react-router-dom";
import { checkError } from "../error/checkError";
import { AuthResponse } from "./interfaces";

interface UserForm {
    email: string;
    password: string;
}

const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            refreshToken
        }
    }
`;

const LoginForm: React.FC = () => {
    const history = useHistory();
    const [form, setForm] = useState<UserForm>({
        email: "",
        password: "",
    });

    const [login] = useMutation<
        {
            login: AuthResponse;
        },
        {
            email: string;
            password: string;
        }
    >(LOGIN_USER, {
        variables: {
            email: form.email,
            password: form.password,
        },
        onCompleted: ({ login: { token, refreshToken } }) => {
            localStorage.setItem(AUTH_KEY, token);
            localStorage.setItem(REFRESH_AUTH_KEY, refreshToken);
            console.log("Login successful");
            history.push("/");
        },
        onError: (error) => {
            if (error.networkError) {
                history.push("/500");
            } else {
                console.log(error);
                checkError(history, error);
            }
        },
    });

    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
    };

    return (
        <div className="w-full">
            <div className="w-3/5 md:w-2/5 xl:w-1/5 rounded-xl mx-auto text-center flex flex-col items-center border-blue-300">
                <h1 className="text-2xl font-medium">Sign In</h1>
                <form onSubmit={(e) => submitForm(e)} className="my-5 w-full">
                    <div className="w-full my-3">
                        <label
                            htmlFor="email"
                            className="block text-left mx-auto"
                        >
                            Email address
                        </label>
                        <input
                            value={form.email}
                            onChange={(e) => updateForm(e)}
                            className="rounded-lg w-full my-2"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="w-full my-3">
                        <div className="flex flex-row space-between mx-auto">
                            <label
                                htmlFor="password"
                                className="text-left w-6/12"
                            >
                                {" "}
                                Password
                            </label>
                            <button
                                type="button"
                                className="transition duration-100 ease-in-out w-6/12 text-right text-blue-700 hover:text-blue-900"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <input
                            value={form.password}
                            onChange={(e) => updateForm(e)}
                            className="rounded-lg w-full my-2"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 p-1 text-white rounded-lg w-full mt-6"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
