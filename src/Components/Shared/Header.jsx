import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rodal from 'rodal';

import ChoosePlayer from '../ChoosePlayer/ChoosePlayer';
import ChooseLevel from '../ChooseLevel/ChooseLevel';
import TopScores from '../TopScores/TopScores';
import { openChoosePlayerModal, closeChoosePlayerModal } from '../../Redux/actions/choosePlayer';

const customModalStyles = {
	width: '94%',
	maxWidth: '1200px',
	maxHeight: '90%',
	overflowY: 'auto',
	height: 'auto',
	paddingTop: '60px',
	position: 'relative',
	margin: 0,
};

class Header extends Component {
	static propTypes = {
		openChoosePlayer: PropTypes.func.isRequired,
		closeChoosePlayer: PropTypes.func.isRequired,
		isChoosePlayerModalOpen: PropTypes.bool.isRequired,
		activePlayerName: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			isChooseLevelModalOpen: false,
			isTopScoresModalOpen: false,
			mobileMenuOpen: false,
		};
	}

	componentDidMount() {
		document.addEventListener('click', this.globalMenuClose);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.globalMenuClose);
	}

	globalMenuClose = event => {
		if (this.menuCollapse && !this.menuCollapse.contains(event.target)) {
			this.setState({ mobileMenuOpen: false });
		}
	};

	openChooseLevelModal = () => {
		this.setState({ isChooseLevelModalOpen: true });
	};

	closeChooseLevelModal = () => {
		this.setState({ isChooseLevelModalOpen: false });
	};

	openTopScoresModal = () => {
		this.setState({ isTopScoresModalOpen: true });
	};

	closeTopScoresModal = () => {
		this.setState({ isTopScoresModalOpen: false });
	};

	toggleMenu = () => {
		const { mobileMenuOpen } = this.state;

		this.setState({ mobileMenuOpen: !mobileMenuOpen });
	};

	render() {
		const { isChoosePlayerModalOpen, openChoosePlayer, closeChoosePlayer, activePlayerName } = this.props;

		const { isChooseLevelModalOpen, isTopScoresModalOpen, mobileMenuOpen } = this.state;

		return (
			<div className="Header">
				<button
					type="button"
					className="Header__menuCollapse"
					onClick={this.toggleMenu}
					ref={el => {
						this.menuCollapse = el;
					}}
				>
					<span className="Header__menuCollapseBar" />
					<span className="Header__menuCollapseBar" />
					<span className="Header__menuCollapseBar" />
				</button>

				<div className={mobileMenuOpen ? 'Header__menu Header__menu--mobileOpen' : 'Header__menu'}>
					<button
						type="button"
						className="Header__item"
						onClick={openChoosePlayer}
						data-spec="actionOpenChoosePlayer"
					>
						Choose a player
					</button>
					<button
						type="button"
						className={activePlayerName ? 'Header__item' : 'Header__item Header__item--disabled'}
						onClick={this.openChooseLevelModal}
						disabled={!activePlayerName}
						data-spec="actionOpenChooseLevel"
					>
						Choose a level
					</button>
					<button
						type="button"
						className={activePlayerName ? 'Header__item' : 'Header__item Header__item--disabled'}
						onClick={this.openTopScoresModal}
						disabled={!activePlayerName}
						data-spec="actionOpenTopScores"
					>
						Top scores
					</button>
				</div>

				{isChoosePlayerModalOpen ? (
					<Rodal
						customStyles={{
							...customModalStyles,
							overflowX: 'hidden',
						}}
						visible={isChoosePlayerModalOpen}
						onClose={closeChoosePlayer}
					>
						<ChoosePlayer />
					</Rodal>
				) : null}

				{isChooseLevelModalOpen ? (
					<Rodal
						customStyles={{
							...customModalStyles,
							maxWidth: '500px',
							overflow: 'visible',
						}}
						visible={isChooseLevelModalOpen}
						onClose={this.closeChooseLevelModal}
					>
						<ChooseLevel closeChooseLevelModal={this.closeChooseLevelModal} />
					</Rodal>
				) : null}

				{isTopScoresModalOpen ? (
					<Rodal
						customStyles={customModalStyles}
						visible={isTopScoresModalOpen}
						onClose={this.closeTopScoresModal}
					>
						<TopScores />
					</Rodal>
				) : null}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	openChoosePlayer: () => dispatch(openChoosePlayerModal()),
	closeChoosePlayer: () => dispatch(closeChoosePlayerModal()),
});

const mapStateToProps = state => ({
	isChoosePlayerModalOpen: state.isChoosePlayerModalOpen,
	activePlayerName: state.activePlayerName,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
