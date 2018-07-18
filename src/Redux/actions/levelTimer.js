import actionTypes from '../constants/actionTypes';
import TIME_INCREMENT from '../constants/timeIncrement';

let timer;

export const startTimer = () => dispatch => {
	timer = setInterval(() => dispatch({ type: actionTypes.UPDATE_TIMER, increment: TIME_INCREMENT }), TIME_INCREMENT);
};

export const stopTimer = () => dispatch => {
	clearInterval(timer);
	timer = undefined;

	dispatch({ type: actionTypes.STOP_TIMER });
};
