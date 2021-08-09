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
import Error500 from "./components/error/Error500";
import Error404 from "./components/error/Error404";
import ScoreReport from "./components/score-report";
import MySubmissions from "./components/my-submissions";
import MyQuizzes from "./components/my-quizzes";

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

            <PrivateRoute
                exact
                path="/score-report/:id"
                component={() => (
                    <MainView link="/score-report">
                        <ScoreReport />
                    </MainView>
                )}
            />

            <PrivateRoute
                exact
                path="/my-submissions"
                component={() => (
                    <MainView link="/my-submissions">
                        <MySubmissions />
                    </MainView>
                )}
            />

            <PrivateRoute
                exact
                path="/my-quizzes"
                component={() => (
                    <MainView link="/my-quizzes">
                        <MyQuizzes />
                    </MainView>
                )}
            />

            <Route exact path="/500" component={Error500} />
            <Route exact path="/404" component={Error404} />
        </Switch>
    );
};

export default App;
