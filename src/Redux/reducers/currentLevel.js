import actionTypes from '../constants/actionTypes';

const initialState = {
	tiles: {},
	inProgress: false,
	levelNr: 1,
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
			return initialState;
		case actionTypes.FAILED_LEVEL:
			return initialState;
		default:
			return state;
	}
}
