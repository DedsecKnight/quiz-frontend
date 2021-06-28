import { Bar } from "react-chartjs-2";
import { client } from "../../graphql/client";
import { getUserInfo } from "../../graphql/query/user";

import { SubmissionObj } from "./interfaces";

const PerformanceChart = () => {
    const { mySubmissions } = client.readQuery({
        query: getUserInfo,
        variables: {
            userId: 1,
        },
    });

    let startIndex = Math.max(0, mySubmissions.length - 6);
    let endIndex = Math.min(startIndex + 6, mySubmissions.length);

    const recentSubmission = mySubmissions.slice(startIndex, endIndex);

    const data = {
        labels: recentSubmission.map((obj: SubmissionObj) => obj.quiz.quizName),
        datasets: [
            {
                label: "Scores",
                data: recentSubmission.map((obj: SubmissionObj) => obj.score),
                backgroundColor: recentSubmission.map(
                    () => "rgba(54, 162, 235, 0.2)"
                ),
                borderColor: recentSubmission.map(
                    () => "rgba(54, 162, 235, 1)"
                ),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <div className="header">
                <h1 className="title">Your Recent Submissions</h1>
            </div>
            <Bar type="bar" data={data} options={options} />
        </>
    );
};

export default PerformanceChart;
