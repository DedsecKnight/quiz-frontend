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
    myRecentSubmissionsLimit: SubmissionObj[];
    myInfo: UserObj;
    myQuizzes: Array<{
        id: number;
    }>;
}
