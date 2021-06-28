export interface AnswerObj {
    answer: string;
    isCorrect: boolean;
}

export interface QuestionObj {
    question: string;
    answers: AnswerObj[];
}

export interface QuizForm {
    userId: number;
    quizName: string;
    difficulty: string;
    category: string;
    questions: QuestionObj[];
}
