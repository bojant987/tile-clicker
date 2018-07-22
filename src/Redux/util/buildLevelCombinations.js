/* eslint-disable no-param-reassign, no-plusplus */
import { PASSIVE } from '../constants/tileStatuses';
import { saveInStorage, getFromStorage, getPossibleTiles, formatTileIndex, calculateStatus } from './util';

// pre compute all valid moves for all tiles
const getValidMoves = (boardWidth = 10) => {
	if (getFromStorage('validMoves')) {
		return getFromStorage('validMoves');
	}

	const validMoves = {};

	for (let x = 1; x <= boardWidth; x++) {
		for (let y = 1; y <= boardWidth; y++) {
			validMoves[formatTileIndex(x, y)] = getPossibleTiles(x, y);
		}
	}

	saveInStorage('validMoves', validMoves);
	return validMoves;
};

const buildCombinations = ({
	level,
	startingPoint,
	combination,
	nextTileToVisit,
	allCombinations,
	clicked,
	takenRoutes,
}) => {
	const currentTile = combination[combination.length - 1].index;
	const nextTile = nextTileToVisit(currentTile);

	// mark current tile as clicked
	clicked[currentTile] = true;

	// if next tile exists do the thing
	if (nextTile) {
		combination.push({
			index: nextTile,
		});

		// reached max tiles, it's a valid path to level end
		if (combination.length === level + 1) {
			// calculate statuses of all tiles before sending them
			allCombinations.push(
				combination.map(tile => {
					if (tile.index === startingPoint) {
						return tile;
					}

					return {
						index: tile.index,
						status: calculateStatus(startingPoint, tile.index),
					};
				})
			);
		}

		// if we return to this tile again
		// we don't want the same next tile
		takenRoutes[currentTile][nextTile] = true;
	} else {
		// if next tile doesn't exist, we need to backtrack
		const wrongTile = { ...combination.pop() };
		takenRoutes[wrongTile.index] = {};
		clicked[wrongTile.index] = false;
	}
};

// brute force the algorithm by pre computing level move combinations for a tile
// with memoization in local storage so we don't have to run this monstrosity every time
const buildLevelCombinations = (startingPoint, level, maxSolutions = 1000) => {
	let memoizedCombinations = getFromStorage('levelTiles') || {};

	// if we already have combinations for this level from this starting point
	// no need to do any of below mess
	if (memoizedCombinations[startingPoint] && memoizedCombinations[startingPoint][level]) {
		return memoizedCombinations[startingPoint][level];
	}

	const allCombinations = [];
	const validMoves = getValidMoves();

	const combination = [
		{
			index: startingPoint,
			status: PASSIVE,
		},
	];

	const clicked = {};
	const takenRoutes = {};

	Object.keys(validMoves).forEach(key => {
		takenRoutes[key] = {};
	});

	const getNextPossibleTiles = pos => {
		const tiles = [];

		validMoves[pos].forEach(tile => {
			if (!clicked[tile] && !takenRoutes[pos][tile]) {
				tiles.push(tile);
			}
		});

		return tiles;
	};

	const nextTileToVisit = pos => {
		const possibleTiles = getNextPossibleTiles(pos);

		// no valid neighbors, oh well
		if (possibleTiles.length === 0 || combination.length === level + 1) {
			return null;
		}

		// we want next tile with least possible next tiles, work fast/fail fast
		return possibleTiles.reduce(
			(min, current) => (getNextPossibleTiles(min).length < getNextPossibleTiles(current).length ? min : current)
		);
	};

	// go go until we fill up solutions, or we run out of them
	while (allCombinations.length < maxSolutions && combination.length > 0) {
		buildCombinations({
			level,
			combination,
			nextTileToVisit,
			allCombinations,
			clicked,
			takenRoutes,
			startingPoint,
		});
	}

	// memoize before returning
	memoizedCombinations = {
		...memoizedCombinations,
		[startingPoint]: {
			...memoizedCombinations[startingPoint],
			[level]: allCombinations,
		},
	};
	saveInStorage('levelTiles', memoizedCombinations);

	return allCombinations;
};

export default buildLevelCombinations;
