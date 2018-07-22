import keyBy from 'lodash.keyby';

import actionTypes from '../constants/actionTypes';
import { startTimer } from './levelTimer';
import { formatTileIndex, getRandomCombination } from '../util/util';
import buildLevelCombinations from '../util/buildLevelCombinations';

const levelBuilt = (playerName, tiles, levelNr) => dispatch => {
	dispatch(startTimer());
	dispatch({
		type: actionTypes.BUILD_LEVEL,
		playerName,
		level: {
			tiles,
			levelNr,
			remainingTiles: Object.keys(tiles).length - 1,
		},
	});
};

const buildLevel = (pos, levelNr, playerName) => dispatch => {
	const tileIndex = formatTileIndex(pos.x, pos.y);
	const combinations = buildLevelCombinations(tileIndex, levelNr, 1000);
	const tiles = keyBy(getRandomCombination(combinations), 'index');

	dispatch(levelBuilt(playerName, tiles, levelNr));
};

export default buildLevel;
