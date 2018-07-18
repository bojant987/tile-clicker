import actionTypes from '../constants/actionTypes';
import { saveInStorage, getFromStorage } from '../util/util';

const initialState = getFromStorage('activePlayerName') ? getFromStorage('activePlayerName') : '';

export default function activePlayerName(state = initialState, action) {
	switch (action.type) {
		case actionTypes.CHOOSE_PLAYER:
			saveInStorage('activePlayerName', action.playerName);

			return action.playerName;
		default:
			return state;
	}
}
