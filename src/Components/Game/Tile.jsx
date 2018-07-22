import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ACTIVE, IDLE } from '../../Redux/constants/tileStatuses';
import { openChoosePlayerModal } from '../../Redux/actions/choosePlayer';
import buildLevel from '../../Redux/actions/buildLevel';
import updateLevel from '../../Redux/actions/updateLevel';
import getActivePlayer from '../../Redux/selectors/activePlayer';

export const _Tile = props => {
	const {
		xPos,
		yPos,
		status,
		buildNextLvl,
		updateLvl,
		levelInProgress,
		levelNr,
		levelTiles,
		activePlayer,
		openChoosePlayer,
		timer,
		scoreId,
	} = props;

	const calculateStatusClassName = () => (status ? `Board__tile--${status}` : '');
	const calculateGameProgressClassName = () => (!levelInProgress ? 'Board__tile--off' : '');

	const resolveAction = () => {
		if (!activePlayer.name) {
			openChoosePlayer();

			return;
		}

		if (levelInProgress) {
			if (status === ACTIVE || status === IDLE) {
				updateLvl({
					referenceTile: { x: xPos, y: yPos, status },
					levelNr,
					levelTiles,
					activePlayer,
					timer,
					scoreId,
				});
			}
		} else {
			buildNextLvl({ x: xPos, y: yPos }, levelNr, activePlayer.name);
		}
	};

	return (
		<div
			className={`Board__tile ${calculateStatusClassName()} ${calculateGameProgressClassName()}`}
			onClick={resolveAction}
			data-spec={`regionTile_${xPos}-${yPos}`}
		/>
	);
};

_Tile.propTypes = {
	buildNextLvl: PropTypes.func.isRequired,
	updateLvl: PropTypes.func.isRequired,
	xPos: PropTypes.number.isRequired,
	yPos: PropTypes.number.isRequired,
	levelInProgress: PropTypes.bool.isRequired,
	levelNr: PropTypes.number.isRequired,
	levelTiles: PropTypes.object.isRequired,
	activePlayer: PropTypes.object.isRequired,
	openChoosePlayer: PropTypes.func.isRequired,
	status: PropTypes.string,
	timer: PropTypes.number.isRequired,
	scoreId: PropTypes.any.isRequired,
};

_Tile.defaultProps = {
	status: null,
};

const mapStateToProps = (state, ownProps) => ({
	status: state.currentLevel.tiles[`${ownProps.xPos}-${ownProps.yPos}`]
		? state.currentLevel.tiles[`${ownProps.xPos}-${ownProps.yPos}`].status
		: null,
	levelInProgress: state.currentLevel.inProgress,
	levelNr: state.currentLevel.levelNr,
	levelTiles: state.currentLevel.tiles,
	timer: state.currentLevel.timer,
	scoreId: state.topScores.filter(score => score.completed).length + 1,
	activePlayer: getActivePlayer(state),
});

const mapDispatchToProps = dispatch => ({
	buildNextLvl: (pos, levelNr, playerName) => dispatch(buildLevel(pos, levelNr, playerName)),
	updateLvl: params => dispatch(updateLevel(params)),
	openChoosePlayer: () => dispatch(openChoosePlayerModal()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(_Tile);
