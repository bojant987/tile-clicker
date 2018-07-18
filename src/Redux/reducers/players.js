import actionTypes from '../constants/actionTypes';
import { saveInStorage, getFromStorage } from '../util/util';

const initialState = getFromStorage('players') ? getFromStorage('players') : [];

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
			saveInStorage('players', newState);

			return newState;
		}
		case actionTypes.COMPLETE_LEVEL: {
			const newState = state.map(player => {
				const playerProgress = action.levelNr + 1 > player.progress ? action.levelNr + 1 : player.progress;
				const updatedActivePlayer = {
					...player,
					lives: player.lives + 1,
					progress: playerProgress,
				};

				return player.name === action.playerName ? updatedActivePlayer : player;
			});
			saveInStorage('players', newState);

			return newState;
		}
		case actionTypes.FAILED_LEVEL: {
			const newState = state.map(player => {
				const playerProgress = action.levelNr + 1 > player.progress ? action.levelNr + 1 : player.progress;
				const updatedActivePlayer = {
					...player,
					lives: player.lives - action.lives,
					progress: player.lives - action.lives < 1 ? 1 : playerProgress,
				};

				return player.name === action.playerName ? updatedActivePlayer : player;
			});
			saveInStorage('players', newState);

			return newState;
		}
		default:
			return state;
	}
}
