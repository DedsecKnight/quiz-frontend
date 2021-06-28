// import Login from "./components/login";
import Login from "./components/login";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/utilities/PrivateRoute";
import Register from "./components/register";
import BrowseQuiz from "./components/browse-quiz";
import MyStats from "./components/my-stats";
import MainView from "./components/main-view";
import CreateQuiz from "./components/create-quiz";
import Settings from "./components/settings";
import Countdown from "./components/start-quiz/Countdown";
import StartQuiz from "./components/start-quiz";

const App: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute
                exact
                path="/"
                component={() => (
                    <MainView link="/">
                        <MyStats />
                    </MainView>
                )}
            />
            <PrivateRoute
                exact
                path="/browse-quiz"
                component={() => (
                    <MainView link="/browse-quiz">
                        <BrowseQuiz />
                    </MainView>
                )}
            />
            <PrivateRoute
                exact
                path="/create-quiz"
                component={() => (
                    <MainView link="/create-quiz">
                        <CreateQuiz />
                    </MainView>
                )}
            />
            <PrivateRoute
                exact
                path="/settings"
                component={() => (
                    <MainView link="/settings">
                        <Settings />
                    </MainView>
                )}
            />
            <PrivateRoute
                exact
                path="/start-quiz/:id/ready"
                component={() => (
                    <MainView link="/start-quiz">
                        <Countdown />
                    </MainView>
                )}
            />

            <PrivateRoute
                exact
                path="/start-quiz/:id"
                component={() => (
                    <MainView link="/start-quiz">
                        <StartQuiz />
                    </MainView>
                )}
            />
        </Switch>
    );
};

export default App;
