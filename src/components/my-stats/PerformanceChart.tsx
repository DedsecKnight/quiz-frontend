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

    const data = {
        labels: mySubmissions.map((obj: SubmissionObj) => obj.quiz.quizName),
        datasets: [
            {
                label: "Scores",
                data: mySubmissions.map((obj: SubmissionObj) => obj.score),
                backgroundColor: mySubmissions.map(
                    () => "rgba(54, 162, 235, 0.2)"
                ),
                borderColor: mySubmissions.map(() => "rgba(54, 162, 235, 1)"),
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
