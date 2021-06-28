import { gql } from "@apollo/client";

export const SubmitSolution = gql`
    mutation SubmitSolution($submitInput: SubmitInput!) {
        submit(submitInput: $submitInput) {
            score
        }
    }
`;
