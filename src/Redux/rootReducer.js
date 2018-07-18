import { combineReducers } from 'redux';

import currentLevel from './reducers/currentLevel';
import players from './reducers/players';
import activePlayerName from './reducers/activePlayerName';
import isChoosePlayerModalOpen from './reducers/isChoosePlayerModalOpen';
import topScores from './reducers/topScores';
import openedChart from './reducers/openedChart';

export default combineReducers({
	currentLevel,
	players,
	activePlayerName,
	isChoosePlayerModalOpen,
	topScores,
	openedChart,
});
