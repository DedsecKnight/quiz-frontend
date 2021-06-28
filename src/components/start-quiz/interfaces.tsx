export interface UserData {
    myInfo: {
        id: string;
    };
}

export interface QuizData {
    quizName: string;
    questions: Array<{
        question: string;
        answers: Array<{
            id: string;
            answer: string;
        }>;
    }>;
}
