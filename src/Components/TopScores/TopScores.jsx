import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { playerScores, displayScores } from '../../Redux/selectors/topScores';
import Score from './Score';

const TopScores = ({ playerName, topScores }) =>
	topScores.length > 0 ? (
		<div className="TopScores">
			<h2 className="h-marginB--xxl">{`${playerName}'s`} top scores</h2>
			<table className="TopScores__table">
				<thead className="TopScores__thead">
					<tr>
						<th className="TopScores__th">Level</th>
						<th className="TopScores__th">Time</th>
						<th className="TopScores__th">Times completed</th>
					</tr>
				</thead>
				<tbody className="TopScores__tbody">
					{topScores.map(score => <Score score={score} key={score.level} />)}
				</tbody>
			</table>
		</div>
	) : (
		<h4 className="h-textCenter h-paddingALL--xxl">You have to click a bit first, {playerName}.</h4>
	);

TopScores.propTypes = {
	topScores: PropTypes.array.isRequired,
	playerName: PropTypes.string,
};

TopScores.defaultProps = {
	playerName: '',
};

const mapStateToProps = state => {
	const scoresByPlayer = playerScores(state, state.activePlayer.name);

	return {
		topScores: displayScores(scoresByPlayer),
		playerName: state.activePlayer.name,
	};
};

export default connect(mapStateToProps)(TopScores);
