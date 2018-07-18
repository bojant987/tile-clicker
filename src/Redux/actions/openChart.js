import actionTypes from '../constants/actionTypes';

const openChart = scoreId => ({
	type: actionTypes.OPEN_CHART,
	scoreId,
});

export default openChart;
