import actionTypes from '../constants/actionTypes';
import { calculateStatus } from '../util/util';
import { stopTimer } from './levelTimer';
import { updateScore, revokeScore } from './score';
import { ACTIVE, IDLE, PASSIVE } from '../constants/tileStatuses';

const levelUpdated = ({ levelNr, timer, scoreId, activePlayer, newTiles }) => dispatch => {
	dispatch(updateScore({ level: levelNr, timer, scoreId, playerName: activePlayer.name }));
	dispatch({
		type: actionTypes.UPDATE_LEVEL,
		tiles: newTiles,
		remainingTiles: Object.values(newTiles).filter(tile => tile.status === ACTIVE || tile.status === IDLE).length,
	});
};

const levelCompleted = ({ levelNr, timer, scoreId, activePlayer }) => dispatch => {
	dispatch(updateScore({ level: levelNr, timer, scoreId, completed: true, playerName: activePlayer.name }));
	dispatch(stopTimer());
	dispatch({
		type: actionTypes.COMPLETE_LEVEL,
		levelNr,
		playerName: activePlayer.name,
		remainingTiles: 0,
	});
};

const levelFailed = ({ levelTiles, scoreId, levelNr, activePlayer }) => dispatch => {
	const remainingTiles = Object.values(levelTiles).filter(tile => tile.status === ACTIVE || tile.status === IDLE);

	dispatch(revokeScore(scoreId));
	dispatch(stopTimer());
	dispatch({
		type: actionTypes.FAILED_LEVEL,
		lives: remainingTiles.length,
		levelNr,
		playerName: activePlayer.name,
		activePlayer,
	});
};

const updateLevel = ({ referenceTile, levelNr, levelTiles, activePlayer, timer, scoreId }) => dispatch => {
	// if clicked tile status is idle, user clicked the wrong tile, the end.
	// Oh, and calculate remaining tiles to punish him
	if (referenceTile.status === IDLE) {
		dispatch(levelFailed({ levelTiles, scoreId, levelNr, activePlayer }));

		return;
	}

	// set clicked tile status to passive
	const newTiles = { ...levelTiles };
	newTiles[`${referenceTile.x}-${referenceTile.y}`].status = PASSIVE;

	// recalculate status of all remaining tiles
	Object.keys(newTiles).forEach(key => {
		if (key !== `${referenceTile.x}-${referenceTile.y}` && newTiles[key].status !== PASSIVE) {
			const pos = key.split('-');
			const tile = { x: parseInt(pos[0]), y: parseInt(pos[1]) };

			newTiles[key].status = calculateStatus({ x: referenceTile.x, y: referenceTile.y }, tile);
		}
	});

	// all tiles passive === all clicked, dispatch complete level
	if (Object.values(newTiles).every(tile => tile.status === PASSIVE)) {
		dispatch(levelCompleted({ levelNr, timer, scoreId, activePlayer }));
	} else {
		dispatch(levelUpdated({ levelNr, timer, scoreId, activePlayer, newTiles }));
	}
};

export default updateLevel;
