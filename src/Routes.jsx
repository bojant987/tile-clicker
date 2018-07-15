import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
import { HashRouter, Route, Switch } from 'react-router-dom';

import AppContainer from './Components/AppContainer';
import Home from './Components/Home';
import ChoosePlayer from './Components/ChoosePlayer/ChoosePlayer';
import Game from './Components/Game/Game';

const Routes = () => (
	<HashRouter>
		<Switch>
			{/* Home */}
			<Route exact path="/">
				<AppContainer Component={Home} />
			</Route>

			{/* Game */}
			<Route path="/game">
				<AppContainer Component={Game} />
			</Route>

			{/* Choose player */}
			<Route path="/chooseplayer">
				<AppContainer Component={ChoosePlayer} requiresActivePlayer={false} hasHeaderAndFooter={false} />
			</Route>
		</Switch>
	</HashRouter>
);

const mapStateToProps = state => ({
	// example
	loginStatus: state.loginStatus,
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
	// example
	getUserPrefs: () => dispatch({ type: 'SOME_ACTION' }),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Routes);
