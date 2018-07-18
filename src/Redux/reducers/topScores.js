import actionTypes from '../constants/actionTypes';
import { saveInStorage, getFromStorage } from '../util/util';

const initialState = getFromStorage('topScores') ? getFromStorage('topScores') : [];

export default function topScores(state = initialState, action) {
	switch (action.type) {
		case actionTypes.UPDATE_SCORE: {
			// TODO: this thing is a mess
			const currentScore = state.find(score => score.id === action.scoreId)
				? { ...state.find(score => score.id === action.scoreId) }
				: { levelTime: 0 };
			const scoreMoves = currentScore.moves ? currentScore.moves : [{ move: 0, time: 0 }];
			const moveBefore = [...scoreMoves].pop();

			scoreMoves.push({
				time: moveBefore ? action.timer - currentScore.levelTime : action.timer,
				move: scoreMoves.length,
			});

			currentScore.levelTime = action.timer;
			currentScore.playerName = action.playerName;
			currentScore.level = action.level;
			currentScore.id = action.scoreId;
			currentScore.completed = action.completed;
			currentScore.moves = scoreMoves;

			const newState = [...state.filter(score => score.id !== action.scoreId), currentScore];
			saveInStorage('topScores', newState.filter(score => score.completed));

			return newState;
		}
		case actionTypes.REVOKE_SCORE:
			return state.filter(score => score.id !== action.scoreId);
		default:
			return state;
	}
}
