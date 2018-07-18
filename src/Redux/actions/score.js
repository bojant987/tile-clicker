import actionTypes from '../constants/actionTypes';

export const updateScore = ({ level, timer, scoreId, completed = false, playerName }) => ({
	type: actionTypes.UPDATE_SCORE,
	level,
	timer,
	scoreId,
	completed,
	playerName,
});

export const revokeScore = (scoreId, playerName) => ({
	type: actionTypes.REVOKE_SCORE,
	scoreId,
	playerName,
});
