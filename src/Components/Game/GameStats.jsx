import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ACTIVE, IDLE } from '../../Redux/constants/tileStatuses';

const GameStats = ({ timer, remainingTiles, activePlayer }) => (
	<div className="GameStats">
		<div className="GameStats__timer h-paddingL--xxl" title="Time elapsed">
			{timer}
		</div>
		<div className="GameStats__remaining h-paddingL--xxl" title="Remaining moves">
			{remainingTiles}
		</div>
		<div className="GameStats__lives h-paddingL--xxl" title="Lives">
			{activePlayer.lives}
		</div>
		<div className="GameStats__level h-paddingL--xxl" title="Level">
			{activePlayer.progress}
		</div>
	</div>
);

GameStats.propTypes = {
	timer: PropTypes.number.isRequired,
	remainingTiles: PropTypes.number.isRequired,
	activePlayer: PropTypes.shape({
		lives: PropTypes.number.isRequired,
		progress: PropTypes.number.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	activePlayer: state.activePlayer,
	timer: state.currentLevel.timer,
	remainingTiles: Object.values(state.currentLevel.tiles).filter(
		tile => tile.status === ACTIVE || tile.status === IDLE
	).length,
});

export default connect(mapStateToProps)(GameStats);
