import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rodal from 'rodal';

import ChoosePlayer from '../ChoosePlayer/ChoosePlayer';
import ChooseLevel from '../ChooseLevel/ChooseLevel';
import { openChoosePlayerModal, closeChoosePlayerModal } from '../../Redux/actions/choosePlayer';

const customModalStyles = {
	width: '94%',
	maxWidth: '1200px',
	height: 'fit-content',
	top: '50%',
	bottom: '50%',
	paddingTop: '60px',
};

class Header extends Component {
	static propTypes = {
		openChoosePlayer: PropTypes.func.isRequired,
		closeChoosePlayer: PropTypes.func.isRequired,
		isChoosePlayerModalOpen: PropTypes.bool.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			isChooseLevelModalOpen: false,
			isTopScoresModalOpen: false,
			mobileMenuOpen: false,
		};
	}

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
		const { isChoosePlayerModalOpen, openChoosePlayer, closeChoosePlayer } = this.props;

		const { isChooseLevelModalOpen, isTopScoresModalOpen, mobileMenuOpen } = this.state;

		return (
			<div className="Header">
				<button type="button" className="Header__menuCollapse" onClick={this.toggleMenu}>
					<span className="Header__menuCollapseBar" />
					<span className="Header__menuCollapseBar" />
					<span className="Header__menuCollapseBar" />
				</button>

				<div className={mobileMenuOpen ? 'Header__menu Header__menu--mobileOpen' : 'Header__menu'}>
					<span className="Header__item" onClick={openChoosePlayer}>
						Choose a player
					</span>
					<span className="Header__item" onClick={this.openChooseLevelModal}>
						Choose a level
					</span>
					<span className="Header__item" onClick={this.openTopScoresModal}>
						Top scores
					</span>
				</div>

				{isChoosePlayerModalOpen ? (
					<Rodal
						customStyles={customModalStyles}
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
							maxWidth: '400px',
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
						<div>Top scores</div>
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
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
