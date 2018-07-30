import actionTypes from '../constants/actionTypes';
import { calculateStatus, formatTileIndex } from '../util/util';
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

	const referenceTileIndex = formatTileIndex(referenceTile.x, referenceTile.y);

	// set clicked tile status to passive
	const newTiles = { ...levelTiles };
	newTiles[referenceTileIndex].status = PASSIVE;

	// recalculate status of all remaining tiles
	Object.keys(newTiles).forEach(tileIndex => {
		if (tileIndex !== referenceTileIndex && newTiles[tileIndex].status !== PASSIVE) {
			newTiles[tileIndex].status = calculateStatus(referenceTileIndex, tileIndex);
		}
	});

	// all tiles passive === all clicked, dispatch complete level
	if (Object.values(newTiles).every(tile => tile.status === PASSIVE)) {
		dispatch(levelCompleted({ levelNr, timer, scoreId, activePlayer }));
	} else {
		// if there are no active tiles left, user is stuck, the end
		if (!Object.values(newTiles).some(tile => tile.status === ACTIVE)) {
			dispatch(levelFailed({ levelTiles, scoreId, levelNr, activePlayer }));

			return;
		}

		dispatch(levelUpdated({ levelNr, timer, scoreId, activePlayer, newTiles }));
	}
};

export default updateLevel;
