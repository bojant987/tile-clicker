import React from 'react';
import PropTypes from 'prop-types';

import TimesDropdown from './TimesDropdown';

const Score = ({ score, showChart }) => (
	<tr className="TopScores__tr">
		<td className="TopScores__td">{score.level}</td>
		<td className="TopScores__td TopScores__td--time">
			<TimesDropdown times={score.times} showChart={showChart} />
		</td>
		<td className="TopScores__td">{score.timesCompleted}</td>
	</tr>
);

Score.propTypes = {
	score: PropTypes.object.isRequired,
	showChart: PropTypes.func.isRequired,
};

export default Score;
