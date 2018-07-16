import actionTypes from '../constants/actionTypes';
import STARTING_LEVEL from '../constants/startingLevel';
import { getFromStorage } from '../util/util';

const initialLevel = getFromStorage('activePlayer') ? getFromStorage('activePlayer').progress : 1;

const initialState = {
	tiles: {},
	inProgress: false,
	levelNr: STARTING_LEVEL || initialLevel,
	timer: 0,
};

export default function currentLevel(state = initialState, action) {
	switch (action.type) {
		case actionTypes.BUILD_LEVEL:
			return {
				...state,
				...action.level,
				inProgress: true,
			};
		case actionTypes.UPDATE_LEVEL:
			return {
				...state,
				tiles: action.tiles,
			};
		case actionTypes.COMPLETE_LEVEL:
			return {
				...state,
				tiles: {},
				levelNr: state.levelNr + 1,
				inProgress: false,
			};
		case actionTypes.FAILED_LEVEL:
			return {
				...state,
				levelNr: action.activePlayer.lives - action.lives < 1 ? 1 || STARTING_LEVEL : state.levelNr,
				tiles: {},
				timer: 0,
				inProgress: false,
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
			};
		case actionTypes.CHOOSE_PLAYER:
			return {
				...state,
				levelNr: action.player.progress,
			};
		default:
			return state;
	}
}
