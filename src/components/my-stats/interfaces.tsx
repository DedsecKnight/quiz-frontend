export interface SubmissionObj {
    score: number;
    quiz: {
        quizName: string;
        difficulty: {
            type: string;
        };
    };
}

export interface UserObj {
    id: number;
    name: string;
}

export interface QueryData {
    mySubmissions: SubmissionObj[];
    myInfo: UserObj;
    myQuizzes: Array<{
        id: number;
    }>;
}
