import actionTypes from '../constants/actionTypes';
import STARTING_LEVEL from '../constants/startingLevel';
import MAX_LEVEL from '../constants/maxLevel';
import { getFromStorage } from '../util/util';

const initialLevel = getFromStorage('activePlayer') ? getFromStorage('activePlayer').progress : STARTING_LEVEL;

const initialState = {
	tiles: {},
	inProgress: false,
	levelNr: initialLevel,
	timer: 0,
	levelSuccess: false,
	levelFailure: false,
	remainingTiles: 0,
};

export default function currentLevel(state = initialState, action) {
	switch (action.type) {
		case actionTypes.BUILD_LEVEL:
			return {
				...state,
				...action.level,
				inProgress: true,
				levelSuccess: false,
				levelFailure: false,
			};
		case actionTypes.UPDATE_LEVEL:
			return {
				...state,
				tiles: action.tiles,
				remainingTiles: action.remainingTiles,
			};
		case actionTypes.COMPLETE_LEVEL:
			return {
				...state,
				tiles: {},
				levelNr: state.levelNr === MAX_LEVEL ? MAX_LEVEL : state.levelNr + 1,
				inProgress: false,
				levelSuccess: true,
				remainingTiles: 0,
				timer: 0,
			};
		case actionTypes.FAILED_LEVEL:
			return {
				...state,
				levelNr: action.activePlayer.lives - action.lives < 1 ? STARTING_LEVEL : state.levelNr,
				tiles: {},
				timer: 0,
				inProgress: false,
				levelFailure: true,
			};
		case actionTypes.UPDATE_TIMER:
			return {
				...state,
				timer: state.timer + action.increment,
			};
		case actionTypes.CHOOSE_LEVEL:
			return {
				...initialState,
				levelNr: action.level,
			};
		case actionTypes.CHOOSE_PLAYER:
			return {
				...initialState,
				levelNr: action.progress,
			};
		default:
			return state;
	}
}
