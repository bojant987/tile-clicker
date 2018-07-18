import actionTypes from '../constants/actionTypes';
import STARTING_LEVEL from '../constants/startingLevel';
import { getFromStorage } from '../util/util';

const initialLevel = getFromStorage('activePlayer') ? getFromStorage('activePlayer').progress : 1;

const initialState = {
	tiles: {},
	inProgress: false,
	levelNr: STARTING_LEVEL || initialLevel,
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
				levelNr: state.levelNr + 1,
				inProgress: false,
				levelSuccess: true,
				remainingTiles: 0,
				timer: 0,
			};
		case actionTypes.FAILED_LEVEL:
			return {
				...state,
				levelNr: action.activePlayer.lives - action.lives < 1 ? 1 || STARTING_LEVEL : state.levelNr,
				tiles: {},
				timer: 0,
				inProgress: false,
				levelFailure: true,
			};
		case actionTypes.UPDATE_TIMER:
			return {
				...state,
				timer: state.timer + 1,
			};
		case actionTypes.CHOOSE_LEVEL:
			return {
				...state,
				levelNr: action.level,
				levelSuccess: false,
				levelFailure: false,
				tiles: {},
				inProgress: false,
				timer: 0,
			};
		case actionTypes.CHOOSE_PLAYER:
			return {
				...state,
				levelNr: action.progress,
			};
		default:
			return state;
	}
}
