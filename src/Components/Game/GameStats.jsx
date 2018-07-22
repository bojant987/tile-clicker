import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getActivePlayer from '../../Redux/selectors/activePlayer';

const GameStats = ({ timer, remainingTiles, lives, level, levelInProgress }) => (
	<div className={levelInProgress ? 'GameStats' : 'GameStats GameStats--off'} data-spec="regionGameStats">
		<div
			className="GameStats__item GameStats__timer h-paddingL--xxl"
			title="Time elapsed"
			data-spec="textLevelTime"
		>
			{Math.round(timer / 1000)}
		</div>
		<div
			className="GameStats__item GameStats__remaining h-paddingL--xxl"
			title="Remaining moves"
			data-spec="textRemainingTiles"
		>
			{remainingTiles}
		</div>
		<div className="GameStats__item GameStats__lives h-paddingL--xxl" title="Lives" data-spec="textPlayerLives">
			{lives}
		</div>
		<div className="GameStats__item GameStats__level h-paddingL--xxl" title="Level" data-spec="textCurrentLevel">
			{level}
		</div>
	</div>
);

GameStats.propTypes = {
	timer: PropTypes.number.isRequired,
	remainingTiles: PropTypes.number.isRequired,
	lives: PropTypes.number.isRequired,
	level: PropTypes.number.isRequired,
	levelInProgress: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	lives: getActivePlayer(state).lives,
	level: state.currentLevel.levelNr,
	timer: state.currentLevel.timer,
	remainingTiles: state.currentLevel.remainingTiles,
	levelInProgress: state.currentLevel.inProgress,
});

export default connect(mapStateToProps)(GameStats);
