import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/auth';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from './components/layout/Alert';
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
					<div className='cover-container d-flex w-100 p-3 mx-auto flex-column'>
						<Navbar />
						<Route exact path='/' component={Landing} />
						<section className='container haha'>
							<Alert />
							<Switch>
								<Route exact path='/register' component={Register} />
								<Route exact path='/login' component={Login} />
							</Switch>
						</section>
					</div>
				</React.Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
