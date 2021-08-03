interface Props {
    title: string;
    numerator: number;
    denominator: number;
    colorCode: string;
}

const ScoreBar: React.FC<Props> = ({
    title,
    numerator,
    denominator,
    colorCode,
}) => {
    const radius = 80;
    const circumference = radius * 2 * Math.PI;

    return (
        <div className="border-2 p-6 rounded-xl">
            <h1
                className="text-center text-xl text-medium"
                style={{ color: colorCode }}
            >
                {title}
            </h1>
            <div className="flex flex-row items-center justify-center relative">
                <h1
                    className="absolute text-xl text-medium"
                    style={{ left: "0.5", color: colorCode }}
                >
                    {`${numerator} / ${denominator}`}
                </h1>
                <svg className="mx-auto" width="200" height="200">
                    <circle
                        className="main"
                        style={{
                            transform: "rotate(-90deg)",
                            transformOrigin: "50% 50%",
                            strokeDasharray: `${circumference} ${circumference}`,
                            strokeDashoffset: `${
                                circumference -
                                (numerator / denominator) * circumference
                            }`,
                        }}
                        stroke={colorCode}
                        strokeWidth="7"
                        fill="transparent"
                        r="80"
                        cx="100"
                        cy="100"
                    />
                </svg>
            </div>
        </div>
    );
};

export default ScoreBar;
