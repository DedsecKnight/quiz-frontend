export interface AnswerObj {
    answer: string;
    isCorrect: boolean;
}

export interface QuestionObj {
    question: string;
    answers: AnswerObj[];
}

export interface QuizForm {
    quizName: string;
    difficulty: string;
    category: string;
    questions: QuestionObj[];
}
