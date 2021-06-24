import { gql } from "@apollo/client";

export const loginUser = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            statusCode
            token
        }
    }
`;

export const registerUser = gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
        registerUser(email: $email, password: $password, name: $name) {
            token
        }
    }
`;
