import actionTypes from '../constants/actionTypes';
import { saveInStorage, getFromStorage } from '../util/util';

const storagePlayer = getFromStorage('activePlayer');
const initialState = storagePlayer
	? JSON.parse(storagePlayer)
	: {
			lives: 1,
			progress: 1,
	  };

export default function activePlayer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.CHOOSE_PLAYER:
			saveInStorage('activePlayer', JSON.stringify(action.player));

			return action.player;
		case actionTypes.COMPLETE_LEVEL: {
			const newState = {
				...state,
				lives: state.lives + 1,
				progress: action.levelNr + 1,
			};
			saveInStorage('activePlayer', JSON.stringify(newState));

			return newState;
		}
		case actionTypes.FAILED_LEVEL: {
			const newState = {
				...state,
				lives: state.lives - action.lives,
				progress: state.lives - action.lives < 1 ? 1 : action.levelNr,
			};
			saveInStorage('activePlayer', JSON.stringify(newState));

			return newState;
		}
		default:
			return state;
	}
}
