import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ACTIVE, IDLE } from '../../Redux/constants/tileStatuses';
import buildLevel from '../../Redux/actions/buildLevel';
import updateLevel from '../../Redux/actions/updateLevel';
import { openChoosePlayerModal } from '../../Redux/actions/choosePlayer';

export const _Tile = props => {
	const {
		xPos,
		yPos,
		status,
		buildNextLvl,
		updateLvl,
		levelInProgress,
		nextLevel,
		levelNr,
		levelTiles,
		activePlayer,
		openChoosePlayer,
	} = props;

	const calculateStatusClassName = () => (status ? `Board__tile--${status}` : '');

	const resolveAction = () => {
		if (!activePlayer.name) {
			openChoosePlayer();

			return;
		}

		if (levelInProgress) {
			if (status === ACTIVE || status === IDLE) {
				updateLvl({ x: xPos, y: yPos, status }, levelNr, levelTiles);
			}
		} else {
			buildNextLvl({ x: xPos, y: yPos }, nextLevel);
		}
	};

	return <div className={`Board__tile ${calculateStatusClassName()}`} onClick={resolveAction} />;
};

_Tile.propTypes = {
	buildNextLvl: PropTypes.func.isRequired,
	updateLvl: PropTypes.func.isRequired,
	xPos: PropTypes.number.isRequired,
	yPos: PropTypes.number.isRequired,
	nextLevel: PropTypes.number.isRequired,
	levelInProgress: PropTypes.bool.isRequired,
	levelNr: PropTypes.number.isRequired,
	levelTiles: PropTypes.object.isRequired,
	activePlayer: PropTypes.object.isRequired,
	openChoosePlayer: PropTypes.func.isRequired,
	status: PropTypes.string,
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
	nextLevel: state.nextLevel,
	activePlayer: state.activePlayer,
});

const mapDispatchToProps = dispatch => ({
	buildNextLvl: (pos, levelNr) => dispatch(buildLevel(pos, levelNr)),
	updateLvl: (referenceTile, levelNr, levelTiles) => dispatch(updateLevel(referenceTile, levelNr, levelTiles)),
	openChoosePlayer: () => dispatch(openChoosePlayerModal()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(_Tile);
