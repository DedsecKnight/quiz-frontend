import { gql } from "@apollo/client";

export const getQuizzes = gql`
    query GetQuizzes {
        quizzes {
            id
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

export const getQuizById = gql`
    query GetQuizById($quizId: Float!) {
        quizById(id: $quizId) {
            quizName
            questions {
                question
                answers {
                    id
                    answer
                }
            }
        }
    }
`;
