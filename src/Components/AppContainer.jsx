import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

import AppHeader from './Shared/Header';
import AppFooter from './Shared/Footer';

class _AppContainer extends React.Component {
	static propTypes = {
		Component: PropTypes.any.isRequired,
		activePlayer: PropTypes.object,
		requiresActivePlayer: PropTypes.bool,
		hasHeaderAndFooter: PropTypes.bool,
	};

	static defaultProps = {
		requiresActivePlayer: true,
		hasHeaderAndFooter: true,
		// mock, to be deleted
		activePlayer: {},
	};

	localStorageEnabled = () => {
		try {
			localStorage.setItem('test', 'test');
			localStorage.removeItem('test');

			return true;
		} catch (e) {
			return false;
		}
	};

	withLoginRedirect = Component => {
		const { activePlayer, requiresActivePlayer } = this.props;

		if (requiresActivePlayer) {
			return activePlayer ? <Component /> : <Redirect to="/chooseplayer" />;
		}

		return <Component />;
	};

	render() {
		const { hasHeaderAndFooter, requiresActivePlayer, Component } = this.props;

		return this.localStorageEnabled() ? (
			<React.Fragment>
				{hasHeaderAndFooter && this.withLoginRedirect(AppHeader)}
				{requiresActivePlayer ? <main>{this.withLoginRedirect(Component)}</main> : <Component />}
				{hasHeaderAndFooter && this.withLoginRedirect(AppFooter)}
			</React.Fragment>
		) : (
			<main className="LocalStorageError h-textCenter h-paddingT--xxl">
				<img src="../../assets/img/error.gif" alt="Error" className="LocalStorageError__photo" />
				<h2>Local storage unavailable</h2>
				<p>
					This app requires you to have cookies enabled. We use it to save your player name, progress, and
					scores. Please enable it and refresh the page
				</p>
			</main>
		);
	}
}

const mapStateToProps = state => ({
	activePlayer: state.activePlayer,
});

const AppContainer = connect(
	mapStateToProps,
	null
)(_AppContainer);

export default withRouter(AppContainer);
