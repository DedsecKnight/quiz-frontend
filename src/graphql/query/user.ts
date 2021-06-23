import { gql } from "@apollo/client";

export const getUserInfo = gql`
    query GetUserInfo {
        mySubmissions {
            score
            quiz {
                quizName
                difficulty {
                    type
                }
            }
        }
        myInfo {
            id
            name
        }
        myQuizzes {
            quizName
            category {
                categoryName
            }
        }
    }
`;
