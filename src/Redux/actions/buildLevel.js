/* eslint-disable no-param-reassign */
import actionTypes from '../constants/actionTypes';
import { calculateStatus, getPossibleTiles } from '../util/util';
import { PASSIVE } from '../constants/tileStatuses';

const calculateTile = (pos, tiles, referencePos) => {
	// get possible tiles from movement rules
	const possibleTiles = getPossibleTiles(pos);

	// filter out non viable ones (<1 || >10 || already placed on level)
	const viableTiles = possibleTiles.filter(
		tile => tile.x >= 1 && tile.x <= 10 && tile.y >= 1 && tile.y <= 10 && !tiles[`${tile.x}-${tile.y}`]
	);

	// get random one out of result set
	const maxIndex = viableTiles.length;
	const randomIndex = Math.floor(Math.random() * maxIndex);
	const newTile = viableTiles[randomIndex];

	// calculate its status
	newTile.status = calculateStatus(referencePos, newTile);

	// return it
	return newTile;
};

const getNextTile = (pos, tiles, levelNr, dispatch, referencePos) => {
	// get random tile, assign it to tiles
	const newTile = calculateTile(pos, tiles, referencePos);

	tiles[`${newTile.x}-${newTile.y}`] = {
		status: newTile.status,
	};

	// if tiles are full, dispatch them
	if (Object.keys(tiles).length === levelNr + 1) {
		dispatch({
			type: actionTypes.BUILD_LEVEL,
			level: {
				tiles,
				levelNr,
			},
		});
	} else {
		// otherwise recurse get next tile with new position
		getNextTile(newTile, tiles, levelNr, dispatch, referencePos);
	}
};

const buildLevel = (pos, levelNr) => dispatch => {
	const tiles = {
		[`${pos.x}-${pos.y}`]: {
			status: PASSIVE,
		},
	};

	getNextTile(pos, tiles, levelNr, dispatch, pos);
};

export default buildLevel;
