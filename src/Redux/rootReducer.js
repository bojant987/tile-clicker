import { combineReducers } from 'redux';

import currentLevel from './reducers/currentLevel';
import players from './reducers/players';
import activePlayer from './reducers/activePlayer';
import isChoosePlayerModalOpen from './reducers/isChoosePlayerModalOpen';
import topScores from './reducers/topScores';

export default combineReducers({
	currentLevel,
	players,
	activePlayer,
	isChoosePlayerModalOpen,
	topScores,
});
