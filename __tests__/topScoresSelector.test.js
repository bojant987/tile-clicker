import { playerScores, displayScores } from '../src/Redux/selectors/topScores';
import actionTypes from '../src/Redux/constants/actionTypes';
import reducer from '../src/Redux/reducers/players';

describe('topScores selectors', () => {
	const state = {
		topScores: [
			{
				levelTime: 12,
				playerName: 'Bojan',
				level: 3,
				id: 0,
				completed: true,
				moves: [{ move: 1, time: 4 }, { move: 2, time: 3 }, { move: 3, time: 5 }],
			},
			{
				levelTime: 14,
				playerName: 'Bojan',
				level: 4,
				id: 1,
				completed: true,
				moves: [{ move: 1, time: 3 }, { move: 2, time: 2 }, { move: 2, time: 5 }, { move: 2, time: 4 }],
			},
			{
				levelTime: 10,
				playerName: 'Bojan',
				level: 3,
				id: 2,
				completed: true,
				moves: [{ move: 1, time: 3 }, { move: 2, time: 2 }, { move: 3, time: 5 }],
			},
			{
				levelTime: 8,
				playerName: 'Bojan',
				level: 4,
				id: 3,
				completed: true,
				moves: [{ move: 1, time: 0 }, { move: 2, time: 4 }, { move: 3, time: 2 }, { move: 3, time: 2 }],
			},
			{
				levelTime: 1,
				playerName: 'Milos',
				level: 1,
				id: 4,
				completed: true,
				moves: [{ move: 1, time: 1 }],
			},
			{
				levelTime: 3,
				playerName: 'Boris',
				level: 2,
				id: 5,
				completed: true,
				moves: [{ move: 1, time: 1 }, { move: 2, time: 2 }],
			},
		],
	};

	test('selects player scores properly', () => {
		expect(playerScores(state, 'Bojan')).toEqual([
			{
				levelTime: 12,
				playerName: 'Bojan',
				level: 3,
				id: 0,
				completed: true,
				moves: [{ move: 1, time: 4 }, { move: 2, time: 3 }, { move: 3, time: 5 }],
			},
			{
				levelTime: 14,
				playerName: 'Bojan',
				level: 4,
				id: 1,
				completed: true,
				moves: [{ move: 1, time: 3 }, { move: 2, time: 2 }, { move: 2, time: 5 }, { move: 2, time: 4 }],
			},
			{
				levelTime: 10,
				playerName: 'Bojan',
				level: 3,
				id: 2,
				completed: true,
				moves: [{ move: 1, time: 3 }, { move: 2, time: 2 }, { move: 3, time: 5 }],
			},
			{
				levelTime: 8,
				playerName: 'Bojan',
				level: 4,
				id: 3,
				completed: true,
				moves: [{ move: 1, time: 0 }, { move: 2, time: 4 }, { move: 3, time: 2 }, { move: 3, time: 2 }],
			},
		]);
	});

	test('selects player scores for table display properly', () => {
		const bojansScores = playerScores(state, 'Bojan');

		expect(displayScores(bojansScores)).toEqual([
			{
				level: 4,
				playerName: 'Bojan',
				timesCompleted: 2,
				times: [{ value: 8, scoreId: 3 }, { value: 14, scoreId: 1 }],
			},
			{
				level: 3,
				playerName: 'Bojan',
				timesCompleted: 2,
				times: [{ value: 10, scoreId: 2 }, { value: 12, scoreId: 0 }],
			},
		]);
	});
});
