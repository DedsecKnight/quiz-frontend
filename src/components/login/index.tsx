import Header from "./Header";
import LoginForm from "./LoginForm";
import Footer from "./Footer";

const Login: React.FC = () => {
    return (
        <div className="flex flex-col space-between h-screen justify-between">
            <Header />
            <LoginForm />
            <Footer />
        </div>
    );
};

export default Login;
