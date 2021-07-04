import { gql, useQuery } from "@apollo/client";
import { Bar } from "react-chartjs-2";
import { useHistory } from "react-router-dom";
import { POLL_INTERVAL } from "../utilities/constants";

import Loading from "../utilities/Loading";
import NoDataFound from "../utilities/NoDataFound";
import ErrorComponent from "../error/Error";

const GET_RECENT_SUBMISSSION = gql`
    query GetRecentSubmission($limit: Float!) {
        myRecentSubmissionsLimit(limit: $limit) {
            score
            quiz {
                quizName
            }
        }
    }
`;

interface QueryData {
    myRecentSubmissionsLimit: Array<{
        score: number;
        quiz: {
            quizName: number;
        };
    }>;
}

const PerformanceChart = () => {
    const history = useHistory();
    const { loading, error, data } = useQuery<
        QueryData,
        {
            limit: number;
        }
    >(GET_RECENT_SUBMISSSION, {
        variables: {
            limit: 6,
        },
        pollInterval: POLL_INTERVAL,
    });

    if (loading) return <Loading />;
    if (error) return <ErrorComponent error={error} />;
    if (!data) return <NoDataFound />;

    const { myRecentSubmissionsLimit } = data;

    const graphData = {
        labels: myRecentSubmissionsLimit.map((obj) => obj.quiz.quizName),
        datasets: [
            {
                label: "Scores",
                data: myRecentSubmissionsLimit.map((obj) => obj.score),
                backgroundColor: myRecentSubmissionsLimit.map(
                    () => "rgba(54, 162, 235, 0.2)"
                ),
                borderColor: myRecentSubmissionsLimit.map(
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
            <Bar type="bar" data={graphData} options={options} />
        </>
    );
};

export default PerformanceChart;
