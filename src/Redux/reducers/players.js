import actionTypes from '../constants/actionTypes';
import { saveInStorage, getFromStorage } from '../util/util';
import STARTING_LEVEL from '../constants/startingLevel';

const initialState = getFromStorage('players') ? getFromStorage('players') : [];

export default function players(state = initialState, action) {
	switch (action.type) {
		case actionTypes.CREATE_PLAYER: {
			const newState = [
				...state,
				{
					name: action.name,
					progress: STARTING_LEVEL,
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
					progress: STARTING_LEVEL > playerProgress ? STARTING_LEVEL : playerProgress,
				};
				saveInStorage('activePlayer', updatedActivePlayer);

				return player.name === action.playerName ? updatedActivePlayer : player;
			});
			saveInStorage('players', newState);

			return newState;
		}
		case actionTypes.FAILED_LEVEL: {
			const newState = state.map(player => {
				const updatedActivePlayer = {
					...player,
					lives: player.lives - action.lives,
					progress: player.lives - action.lives < 1 ? STARTING_LEVEL : player.progress,
				};
				saveInStorage('activePlayer', updatedActivePlayer);

				return player.name === action.playerName ? updatedActivePlayer : player;
			});
			saveInStorage('players', newState);

			return newState;
		}
		case actionTypes.BUILD_LEVEL: {
			const newState = state.map(player => {
				const updatedActivePlayer = {
					...player,
					lives: player.lives < 1 ? 1 : player.lives,
				};
				saveInStorage('activePlayer', updatedActivePlayer);

				return player.name === action.playerName ? updatedActivePlayer : player;
			});
			saveInStorage('players', newState);

			return newState;
		}
		default:
			return state;
	}
}
