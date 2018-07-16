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
					lives: 1,
				},
			];
			saveInStorage('players', JSON.stringify(newState));

			return newState;
		}
		case actionTypes.COMPLETE_LEVEL: {
			// TODO: myb use reselect for active player instead???
			const newState = state.map(player => {
				const updatedActivePlayer = {
					...player,
					lives: player.lives + 1,
					progress: action.levelNr + 1,
				};

				return player.name === action.playerName ? updatedActivePlayer : player;
			});
			saveInStorage('players', JSON.stringify(newState));

			return newState;
		}
		case actionTypes.FAILED_LEVEL: {
			const newState = state.map(player => {
				const updatedActivePlayer = {
					...player,
					lives: player.lives - action.lives,
					progress: player.lives - action.lives < 1 ? 1 : action.levelNr,
				};

				return player.name === action.playerName ? updatedActivePlayer : player;
			});
			saveInStorage('players', JSON.stringify(newState));

			return newState;
		}
		default:
			return state;
	}
}
