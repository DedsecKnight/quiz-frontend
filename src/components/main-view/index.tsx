import NavBar from "../navbar";
import "./index.css";

interface Props {
    link: string;
}

const MainView: React.FC<Props> = ({ link, children }) => {
    return (
        <div className="flex flex-col main-view h-screen relative">
            <div className="navbar w-full hidden md:block h-full">
                <NavBar active={link} />
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
};

export default MainView;
