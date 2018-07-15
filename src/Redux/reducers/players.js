import actionTypes from '../constants/actionTypes';
import { saveInStorage, getFromStorage } from '../util/util';

const storagePlayers = getFromStorage('players');
const initialState = storagePlayers ? JSON.parse(storagePlayers) : [];

export default function players(state = initialState, action) {
	switch (action.type) {
		case actionTypes.CREATE_PLAYER: {
			const newState = [
				...state,
				{
					name: action.name,
					progress: 1,
				},
			];
			saveInStorage('players', JSON.stringify(newState));

			return newState;
		}
		default:
			return state;
	}
}
