import { combineReducers } from 'redux';

import currentLevel from './reducers/currentLevel';
import nextLevel from './reducers/nextLevel';
import players from './reducers/players';
import activePlayer from './reducers/activePlayer';
import isChoosePlayerModalOpen from './reducers/isChoosePlayerModalOpen';

export default combineReducers({
	currentLevel,
	nextLevel,
	players,
	activePlayer,
	isChoosePlayerModalOpen,
});
