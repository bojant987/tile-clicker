import actionTypes from '../constants/actionTypes';

const initialState = false;

export default function isChoosePlayerModalOpen(state = initialState, action) {
	switch (action.type) {
		case actionTypes.OPEN_CHOOSE_PLAYER_MODAL:
			return true;
		case actionTypes.CLOSE_CHOOSE_PLAYER_MODAL:
			return false;
		default:
			return state;
	}
}
