import actionTypes from '../constants/actionTypes';

const createPlayer = name => ({
	type: actionTypes.CREATE_PLAYER,
	name,
});

export default createPlayer;
