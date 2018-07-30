/* eslint-disable no-empty */
import MOVEMENT_RULES from '../constants/movementRules';
import { ACTIVE, IDLE } from '../constants/tileStatuses';

export const getRandomCombination = combinations => {
	const maxIndex = combinations.length;
	const randomIndex = Math.floor(Math.random() * maxIndex);

	return combinations[randomIndex];
};

export const formatTileIndex = (x, y) => `${x}-${y}`;

export const getPositionFromIndex = index => ({
	x: parseInt(index.split('-')[0]),
	y: parseInt(index.split('-')[1]),
});

export const getPossibleTiles = (x, y, boardWidth = 10) => {
	const tiles = [];

	MOVEMENT_RULES.forEach(rule => {
		const newX = x + rule.x;
		const newY = y + rule.y;

		if (newX >= 1 && newX <= boardWidth && newY >= 1 && newY <= boardWidth) {
			tiles.push(formatTileIndex(newX, newY));
		}
	});

	return tiles;
};

export const calculateStatus = (referenceIndex, newTileIndex) => {
	// get possible tiles from movement rules
	const possibleTiles = getPossibleTiles(
		getPositionFromIndex(referenceIndex).x,
		getPositionFromIndex(referenceIndex).y
	);

	if (possibleTiles.some(tile => tile === newTileIndex)) {
		return ACTIVE;
	}

	return IDLE;
};

// AppContainer is in charge of giving feedback when local storage is disabled
// so we don't want these two to log error pointlessly
export const saveInStorage = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {}
};

export const getFromStorage = key => {
	let value;

	try {
		value = JSON.parse(localStorage.getItem(key));
	} catch (e) {}

	return value;
};

export const generateLevelsforSelection = maxLevel =>
	[...Array(maxLevel).keys()].map((_value, index) => ({
		value: index,
		label: index,
	}));
