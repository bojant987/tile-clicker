import actionTypes from '../constants/actionTypes';

let timer;

export const startTimer = () => dispatch => {
	timer = setInterval(() => dispatch({ type: actionTypes.UPDATE_TIMER }), 1000);
};

export const stopTimer = () => dispatch => {
	clearInterval(timer);
	timer = undefined;

	dispatch({ type: actionTypes.STOP_TIMER });
};
