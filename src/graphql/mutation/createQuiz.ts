import { gql } from "@apollo/client";

export const createQuiz = gql`
    mutation CreateQuiz($quizObj: QuizArgs!) {
        createQuiz(quiz: $quizObj) {
            id
        }
    }
`;
