import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./App.css";

import PrivateRoute from './components/routing/PrivateRoute';
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from './components/dashboard/Dashboard';
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<React.Fragment>
					<Route exact path='/' component={Landing} />
					<Switch>
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
						<PrivateRoute exact path='/dashboard' component={Dashboard} />
					</Switch>
				</React.Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
