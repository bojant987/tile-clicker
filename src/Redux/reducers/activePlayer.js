import actionTypes from '../constants/actionTypes';
import { saveInStorage, getFromStorage } from '../util/util';

const storagePlayer = getFromStorage('activePlayer');
const initialState = storagePlayer ? JSON.parse(storagePlayer) : {};

export default function activePlayer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.CHOOSE_PLAYER:
			saveInStorage('activePlayer', JSON.stringify(action.player));
			return action.player;
		default:
			return state;
	}
}
