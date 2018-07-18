import actionTypes from '../constants/actionTypes';

const initialState = '';

export default function openedChart(state = initialState, action) {
	switch (action.type) {
		case actionTypes.OPEN_CHART:
			return action.scoreId;
		default:
			return state;
	}
}
