/* eslint-disable no-empty */
import MOVEMENT_RULES from '../constants/movementRules';
import { ACTIVE, IDLE } from '../constants/tileStatuses';

export const getPossibleTiles = referencePos =>
	MOVEMENT_RULES.map(tile => {
		const nextX = tile.x.operation
			? tile.x.operation === '+'
				? referencePos.x + tile.x.value
				: referencePos.x - tile.x.value
			: referencePos.x;
		const nextY = tile.y.operation
			? tile.y.operation === '+'
				? referencePos.y + tile.y.value
				: referencePos.y - tile.y.value
			: referencePos.y;

		return {
			x: nextX,
			y: nextY,
		};
	});

export const calculateStatus = (referencePos, newTilePos) => {
	// get possible tiles from movement rules
	const possibleTiles = getPossibleTiles(referencePos);

	if (possibleTiles.some(tile => tile.x === newTilePos.x && tile.y === newTilePos.y)) {
		return ACTIVE;
	}

	return IDLE;
};

// AppContainer is in charge of giving feedback when local storage is disabled
// so we don't want these two to log error pointlessly
export const saveInStorage = (key, value) => {
	try {
		localStorage.setItem(key, value);
	} catch (e) {}
};

export const getFromStorage = key => {
	let value;

	try {
		value = localStorage.getItem(key);
	} catch (e) {}

	return value;
};
