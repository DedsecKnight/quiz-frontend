import Header from "./Header";
import RegisterForm from "./RegisterForm";
import Footer from "./Footer";

const Register = () => {
    return (
        <div className="flex flex-col space-between h-screen justify-between">
            <Header />
            <RegisterForm />
            <Footer />
        </div>
    );
};

export default Register;
