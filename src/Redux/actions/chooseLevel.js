import actionTypes from '../constants/actionTypes';

const chooseLevel = level => ({
	type: actionTypes.CHOOSE_LEVEL,
	level,
});

export default chooseLevel;
