import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Redirect, Route} from "react-router";
import {HashRouter as Router} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import Login from "./Login/src/features/Login";
import 'semantic-ui-css/semantic.min.css';
import Home from "./App";
import Tasks from './Tasks/App';





injectTapEventPlugin();

const customHistory = createBrowserHistory();
const Root = () => (
<div>
        <Router history={customHistory}>
            <div>
                <Route path="/login" component={Login}/>
                <Route exact path="/app/home" component={Home}/>
                <Route exact path="/Tasks" component={Tasks}/>
                <Redirect from="/" to="/Login"/>

            </div>
        </Router>
</div>
);
ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
