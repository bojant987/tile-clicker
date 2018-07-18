import actionTypes from '../constants/actionTypes';

const choosePlayer = (playerName, progress) => ({
	type: actionTypes.CHOOSE_PLAYER,
	playerName,
	progress,
});

export const openChoosePlayerModal = () => ({
	type: actionTypes.OPEN_CHOOSE_PLAYER_MODAL,
});

export const closeChoosePlayerModal = () => ({
	type: actionTypes.CLOSE_CHOOSE_PLAYER_MODAL,
});

export default choosePlayer;
