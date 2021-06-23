// import Login from "./components/login";
import MainView from "./components/main-view";
import Login from "./components/login";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/utilities/PrivateRoute";
import Register from "./components/register";

const App: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={MainView} />
            <Route exact path="/register" component={Register} />
        </Switch>
    );
};

export default App;
