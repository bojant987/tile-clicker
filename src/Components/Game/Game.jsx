/* eslint-disable react/no-unused-prop-types, react/no-unused-state */
// eslint you have failed me
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Rodal from 'rodal';

import GameStats from './GameStats';
import Board from './Board';
import getActivePlayer from '../../Redux/selectors/activePlayer';

const customModalStyles = {
	width: '94%',
	maxWidth: '600px',
	paddingBottom: '60px',
	maxHeight: '90%',
	overflowY: 'auto',
	height: 'auto',
	paddingTop: '60px',
	position: 'relative',
	margin: 0,
};

export class _Game extends Component {
	static propTypes = {
		levelSuccess: PropTypes.bool.isRequired,
		levelFailure: PropTypes.bool.isRequired,
		levelNr: PropTypes.number.isRequired,
		remainingTiles: PropTypes.number.isRequired,
		remainingLives: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			isSuccessModalOpen: false,
			isFailureModalOpen: false,
			levelSuccess: false,
			levelFailure: false,
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.levelSuccess !== state.levelSuccess) {
			return {
				levelSuccess: props.levelSuccess,
				isSuccessModalOpen: props.levelSuccess,
			};
		}

		if (props.levelFailure !== state.levelFailure) {
			return {
				levelFailure: props.levelFailure,
				isFailureModalOpen: props.levelFailure,
			};
		}

		return null;
	}

	closeSuccessModal = () => {
		this.setState({ isSuccessModalOpen: false });
	};

	closeFailureModal = () => {
		this.setState({ isFailureModalOpen: false });
	};

	render() {
		const { levelNr, remainingTiles, remainingLives } = this.props;
		const { isSuccessModalOpen, isFailureModalOpen } = this.state;

		return (
			<div className="Game">
				<GameStats />
				<Board />

				{isSuccessModalOpen ? (
					<Rodal
						customStyles={customModalStyles}
						visible={isSuccessModalOpen}
						onClose={this.closeSuccessModal}
					>
						<div className="Game__status Game__status--success h-textCenter h-centerBlock">
							<img
								className="Game__statusIcon"
								src="../../../assets/img/success-flag.svg"
								alt="Success"
							/>
							<h4 className="h-marginB--md">You did it! You clicked {levelNr} times!</h4>
							<span className="Game__statusLives h-paddingL--xxl">+1</span>
						</div>
					</Rodal>
				) : null}

				{isFailureModalOpen ? (
					<Rodal
						customStyles={customModalStyles}
						visible={isFailureModalOpen}
						onClose={this.closeFailureModal}
					>
						<div className="Game__status Game__status--failure h-textCenter h-centerBlock">
							<img
								className="Game__statusIcon"
								src={
									remainingLives > 0
										? '../../../assets/img/failure.svg'
										: '../../../assets/img/danger.svg'
								}
								alt="Failure"
							/>
							<h4 className="h-marginB--md">
								{remainingLives > 0 ? 'Oh no, what have you done?' : "Now you've done it. Game over."}
							</h4>
							<span className="Game__statusLives h-paddingL--xxl">-{remainingTiles}</span>
						</div>
					</Rodal>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	levelSuccess: state.currentLevel.levelSuccess,
	levelFailure: state.currentLevel.levelFailure,
	levelNr: state.currentLevel.levelNr,
	remainingTiles: state.currentLevel.remainingTiles,
	remainingLives: getActivePlayer(state).lives,
});

export default connect(mapStateToProps)(_Game);
