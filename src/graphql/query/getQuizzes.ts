import { gql } from "@apollo/client";

export const getQuizzes = gql`
    query GetQuizzes {
        quizzes {
            quizName
            author {
                name
            }
            difficulty {
                type
            }
            category {
                categoryName
            }
        }
    }
`;
