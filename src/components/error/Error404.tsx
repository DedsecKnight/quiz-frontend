import { useLocation } from "react-router-dom";

interface Props {
    message: string;
}

const Error404: React.FC = () => {
    const location = useLocation();
    const propData: Props = location.state as Props;

    return <div>404: {propData.message}</div>;
};

export default Error404;
