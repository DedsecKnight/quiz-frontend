export interface QuizObj {
    id: number;
    quizName: string;
    author: {
        name: string;
    };
    difficulty: {
        type: string;
    };
    category: {
        categoryName: string;
    };
}

export interface QuizData {
    quizzes: QuizObj[];
}
