import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Hamburger from "../utilities/Hamburger";

interface MatchData {
    id: string;
}

const Countdown: React.FC = () => {
    const match = useRouteMatch("/start-quiz/:id/ready");

    const matchData: MatchData = match
        ? (match.params as MatchData)
        : {
              id: "0",
          };

    const [seconds, setSeconds] = useState(10);
    const history = useHistory();

    useEffect(() => {
        let timer = setTimeout(() => {
            if (seconds > 0) setSeconds((prev) => prev - 1);
            else {
                clearTimeout(timer);
                history.push(`/start-quiz/${matchData.id}`);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [seconds, matchData.id, history]);

    return (
        <div className="w-full h-full relative">
            <Hamburger />
            <div className="absolute container mx-auto top-1/2 lg:top-1/4">
                <h1 className="text-2xl text-center">Quiz is starting in</h1>
                <h1 className="text-2xl text-center text-blue-600">
                    {seconds} seconds
                </h1>
            </div>
        </div>
    );
};

export default Countdown;
