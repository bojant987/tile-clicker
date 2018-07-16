import React from 'react';

import AppHeader from './Shared/Header';
import AppFooter from './Shared/Footer';
import Game from './Game/Game';

const AppContainer = () => {
	const localStorageEnabled = () => {
		try {
			localStorage.setItem('test', 'test');
			localStorage.removeItem('test');

			return true;
		} catch (e) {
			return false;
		}
	};

	return localStorageEnabled() ? (
		<React.Fragment>
			<AppHeader />
			<main>
				<Game />
			</main>
			<AppFooter />
		</React.Fragment>
	) : (
		<main className="LocalStorageError h-textCenter h-paddingT--xxl">
			<img src="../../assets/img/error.gif" alt="Error" className="LocalStorageError__photo" />
			<h2>Local storage unavailable</h2>
			<p>
				This app requires you to have cookies enabled. We use it to save your player name, progress, and scores.
				Please enable it and refresh the page
			</p>
		</main>
	);
};

export default AppContainer;
