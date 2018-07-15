import actionTypes from '../constants/actionTypes';

const choosePlayer = player => ({
	type: actionTypes.CHOOSE_PLAYER,
	player,
});

export const openChoosePlayerModal = () => ({
	type: actionTypes.OPEN_CHOOSE_PLAYER_MODAL,
});

export const closeChoosePlayerModal = () => ({
	type: actionTypes.CLOSE_CHOOSE_PLAYER_MODAL,
});

export default choosePlayer;
