import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../utilities/Loading";
import { injectClass } from "../utilities/inject-class";

import ErrorComponent from "../error/Error";
import NoDataFound from "../utilities/NoDataFound";
import { BAD_USER_INPUT } from "../error/errorCode";
import AlertList from "../error/AlertList";

interface FormType {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const GET_USER_DATA = gql`
    query GetUserData {
        myInfo {
            name
            email
        }
    }
`;

const UPDATE_PROFILE = gql`
    mutation UpdateProfile(
        $email: String!
        $password: String!
        $name: String!
    ) {
        updateProfile(name: $name, email: $email, password: $password) {
            name
        }
    }
`;

interface QueryData {
    myInfo: {
        name: string;
        email: string;
    };
}

const Settings = () => {
    const history = useHistory();

    const { loading, error, data } = useQuery<QueryData>(GET_USER_DATA);

    const [formData, setFormData] = useState<FormType>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<string[]>([]);

    const [updateProfile] = useMutation<
        {
            updateProfile: {
                name: string;
            };
        },
        {
            name: string;
            password: string;
            email: string;
        }
    >(UPDATE_PROFILE, {
        variables: {
            name: formData.name,
            password: formData.password,
            email: formData.email,
        },
        onCompleted: () => {
            alert("Profile updated");
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
        setErrors([]);
        updateProfile();
    };

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;
    if (!data) return <NoDataFound />;

    return (
        <>
            <div
                className="block md:hidden cursor-pointer p-4"
                onClick={() => injectClass()}
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
            <AlertList
                errors={errors}
                onCloseAlert={(idx) => {
                    let currentErrors = [...errors];
                    currentErrors.splice(idx, 1);
                    setErrors(currentErrors);
                }}
            />
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
};

export default Settings;
