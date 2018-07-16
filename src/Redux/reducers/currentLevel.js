import actionTypes from '../constants/actionTypes';

const initialState = {
	tiles: {},
	inProgress: false,
	levelNr: 1,
	timer: 0,
};

export default function currentLevel(state = initialState, action) {
	switch (action.type) {
		case actionTypes.BUILD_LEVEL:
			return {
				...state,
				...action.level,
				inProgress: true,
			};
		case actionTypes.UPDATE_LEVEL:
			return {
				...state,
				tiles: action.tiles,
			};
		case actionTypes.COMPLETE_LEVEL:
			return {
				...state,
				tiles: {},
				inProgress: false,
			};
		case actionTypes.FAILED_LEVEL:
			return initialState;
		case actionTypes.UPDATE_TIMER:
			return {
				...state,
				timer: state.timer + 1,
			};
		default:
			return state;
	}
}
