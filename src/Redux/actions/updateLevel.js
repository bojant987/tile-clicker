import actionTypes from '../constants/actionTypes';
import { calculateStatus } from '../util/util';
import { ACTIVE, IDLE, PASSIVE } from '../constants/tileStatuses';

const updateLevel = (referenceTile, levelNr, levelTiles) => dispatch => {
	// if clicked tile status is idle, user clicked the wrong tile, the end.
	// Oh, and calculate remaining tiles to punish him
	if (referenceTile.status === IDLE) {
		const remainingTiles = Object.values(levelTiles).filter(tile => tile.status === ACTIVE || tile.status === IDLE);

		dispatch({
			type: actionTypes.FAILED_LEVEL,
			lives: remainingTiles.length,
		});

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
		dispatch({
			type: actionTypes.COMPLETE_LEVEL,
		});
	} else {
		dispatch({
			type: actionTypes.UPDATE_LEVEL,
			tiles: newTiles,
		});
	}
};

export default updateLevel;