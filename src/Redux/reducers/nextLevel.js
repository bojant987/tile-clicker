import actionTypes from '../constants/actionTypes';

const initialState = 1;

export default function nextLevel(state = initialState, action) {
	switch (action.type) {
		case actionTypes.COMPLETE_LEVEL:
			return state + 1;
		default:
			return state;
	}
}
