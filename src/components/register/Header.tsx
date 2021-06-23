import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex flex-row px-10 py-5 justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-700">Quiz?</h1>
            <div className="flex flex-row items-center gap-x-4">
                <p>Already have an account?</p>
                <Link
                    to="/login"
                    className="transition duration-300 ease-in-out border-2 border-blue-300 border-solid hover:border-transparent hover:bg-blue-300 focus:outline-none py-2 px-4 rounded-xl"
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Header;
