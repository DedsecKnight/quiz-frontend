import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AUTH_KEY, REFRESH_AUTH_KEY } from "../../constants";
import { useHistory } from "react-router-dom";
import AlertList from "../error/AlertList";
import { AuthResponse } from "./interfaces";
import { BAD_USER_INPUT } from "../error/errorCode";

interface UserForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const REGISTER_USER = gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
        registerUser(email: $email, password: $password, name: $name) {
            token
            refreshToken
        }
    }
`;

const RegisterForm: React.FC = () => {
    const history = useHistory();
    const [form, setForm] = useState<UserForm>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<string[]>([]);

    const [register] = useMutation<
        {
            registerUser: AuthResponse;
        },
        {
            name: string;
            email: string;
            password: string;
        }
    >(REGISTER_USER, {
        variables: {
            name: form.name,
            email: form.email,
            password: form.password,
        },
        onCompleted: ({ registerUser: { token } }) => {
            localStorage.setItem(AUTH_KEY, token);
            localStorage.setItem(REFRESH_AUTH_KEY, token);
            history.push("/");
        },
        onError: (error) => {
            if (error.networkError) history.push("/500");
            error.graphQLErrors.forEach((errorObject) => {
                if (errorObject.extensions!.code === BAD_USER_INPUT)
                    Object.keys(
                        errorObject.extensions!.validationErrors
                    ).forEach((key) => {
                        if (
                            errorObject.extensions!.validationErrors[
                                key
                            ] instanceof Array
                        ) {
                            errorObject.extensions!.validationErrors[
                                key
                            ].forEach((err: string) => {
                                setErrors((prev) => [...prev, err]);
                            });
                        } else
                            setErrors((prev) => [
                                ...prev,
                                errorObject.extensions!.validationErrors[key],
                            ]);
                    });
                else {
                    setErrors((prev) => [...prev, error.message]);
                }
            });
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
        if (form.password !== form.confirmPassword) {
            alert("Password do not match");
            setForm({
                ...form,
                password: "",
                confirmPassword: "",
            });
        } else register();
    };

    return (
        <>
            <AlertList
                errors={errors}
                onCloseAlert={(idx) => {
                    let currentErrors = [...errors];
                    currentErrors.splice(idx, 1);
                    setErrors(currentErrors);
                }}
            />
            <div className="w-full">
                <div className="w-3/5 md:w-2/5 xl:w-1/5 rounded-xl mx-auto text-center flex flex-col items-center border-blue-300">
                    <h1 className="text-2xl font-medium">
                        Let's create an account
                    </h1>
                    <form
                        onSubmit={(e) => submitForm(e)}
                        className="my-5 w-full"
                    >
                        <div className="w-full my-3">
                            <label
                                htmlFor="name"
                                className="block text-left mx-auto"
                            >
                                Name
                            </label>
                            <input
                                required
                                value={form.name}
                                onChange={(e) => updateForm(e)}
                                className="rounded-lg w-full my-2"
                                type="text"
                                name="name"
                                placeholder="Name"
                            />
                        </div>
                        <div className="w-full my-3">
                            <label
                                htmlFor="email"
                                className="block text-left mx-auto"
                            >
                                Email address
                            </label>
                            <input
                                required
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
                            </div>
                            <input
                                required
                                value={form.password}
                                onChange={(e) => updateForm(e)}
                                className="rounded-lg w-full my-2"
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>

                        <div className="w-full my-3">
                            <div className="flex flex-row space-between mx-auto">
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-left w-6/12"
                                >
                                    {" "}
                                    Confirm Password
                                </label>
                            </div>
                            <input
                                required
                                value={form.confirmPassword}
                                onChange={(e) => updateForm(e)}
                                className="rounded-lg w-full my-2"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 p-1 text-white rounded-lg w-full mt-6"
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
