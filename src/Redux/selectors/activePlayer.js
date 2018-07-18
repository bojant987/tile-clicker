const getActivePlayer = state =>
	state.players.find(player => player.name === state.activePlayerName) || { lives: 1, progress: 1 };

export default getActivePlayer;
