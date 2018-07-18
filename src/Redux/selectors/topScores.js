import groupBy from 'lodash.groupby';

export const playerScores = (state, playerName) => state.topScores.filter(score => score.playerName === playerName);

export const displayScores = scores => {
	// group scores by level for table display
	const scoresByLevel = groupBy(scores, 'level');
	// reduce all level scores to one obj
	return Object.values(scoresByLevel)
		.map(arr => {
			const times = [];
			arr.forEach(score => {
				times.push(score.levelTime);
			});
			times.sort((a, b) => parseInt(a) - parseInt(b));

			return {
				level: arr[0].level,
				playerName: arr[0].playerName,
				timesCompleted: times.length,
				times,
			};
		})
		.sort((a, b) => parseInt(b.level) - parseInt(a.level));
};
