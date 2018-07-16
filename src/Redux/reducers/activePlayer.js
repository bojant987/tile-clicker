import actionTypes from '../constants/actionTypes';
import { saveInStorage, getFromStorage } from '../util/util';

const initialState = getFromStorage('activePlayer')
	? getFromStorage('activePlayer')
	: {
			lives: 1,
			progress: 1,
	  };

export default function activePlayer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.CHOOSE_PLAYER:
			saveInStorage('activePlayer', action.player);

			return action.player;
		case actionTypes.COMPLETE_LEVEL: {
			const newState = {
				...state,
				lives: state.lives + 1,
				progress: action.levelNr + 1 > state.progress ? action.levelNr + 1 : state.progress,
			};
			saveInStorage('activePlayer', newState);

			return newState;
		}
		case actionTypes.FAILED_LEVEL: {
			const newState = {
				...state,
				lives: state.lives - action.lives < 1 ? 0 : state.lives - action.lives,
				progress: state.lives - action.lives < 1 ? 1 : state.progress,
			};
			saveInStorage('activePlayer', newState);

			return newState;
		}
		default:
			return state;
	}
}
