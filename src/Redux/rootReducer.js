import { combineReducers } from 'redux';

import currentLevel from './reducers/currentLevel';
import players from './reducers/players';
import activePlayerName from './reducers/activePlayerName';
import isChoosePlayerModalOpen from './reducers/isChoosePlayerModalOpen';
import topScores from './reducers/topScores';

export default combineReducers({
	currentLevel,
	players,
	activePlayerName,
	isChoosePlayerModalOpen,
	topScores,
});
