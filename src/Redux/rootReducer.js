import { combineReducers } from 'redux';

import currentLevel from './reducers/currentLevel';
import nextLevel from './reducers/nextLevel';

export default combineReducers({
	currentLevel,
	nextLevel,
});
