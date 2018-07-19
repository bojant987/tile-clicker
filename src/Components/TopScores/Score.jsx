import React from 'react';
import PropTypes from 'prop-types';

import TimesDropdown from './TimesDropdown';

const Score = ({ score }) => (
	<tr className="TopScores__tr">
		<td className="TopScores__td">{score.level}</td>
		<td className="TopScores__td TopScores__td--time">
			<TimesDropdown times={score.times} />
		</td>
		<td className="TopScores__td">{score.timesCompleted}</td>
	</tr>
);

Score.propTypes = {
	score: PropTypes.object.isRequired,
};

export default Score;
