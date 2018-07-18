import reducer from '../src/Redux/reducers/topScores';
import actionTypes from '../src/Redux/constants/actionTypes';

describe('topScores reducer', () => {
	test('UPDATE_SCORE - enters a score for the first time', () => {
		expect(
			reducer([], {
				type: actionTypes.UPDATE_SCORE,
				level: 1,
				timer: 1,
				scoreId: 0,
				completed: true,
				playerName: 'Bojan',
			})
		).toEqual([
			{
				levelTime: 1,
				playerName: 'Bojan',
				level: 1,
				id: 0,
				completed: true,
				moves: [{ move: 0, time: 0 }, { move: 1, time: 1 }],
			},
		]);
	});

	test('UPDATE_SCORE - enters another score for the same level', () => {
		expect(
			reducer(
				[
					{
						levelTime: 1,
						playerName: 'Bojan',
						level: 1,
						id: 0,
						completed: true,
						moves: [{ move: 0, time: 0 }, { move: 1, time: 1 }],
					},
				],
				{
					type: actionTypes.UPDATE_SCORE,
					level: 1,
					timer: 2,
					scoreId: 1,
					completed: true,
					playerName: 'Bojan',
				}
			)
		).toEqual([
			{
				levelTime: 1,
				playerName: 'Bojan',
				level: 1,
				id: 0,
				completed: true,
				moves: [{ move: 0, time: 0 }, { move: 1, time: 1 }],
			},
			{
				levelTime: 2,
				playerName: 'Bojan',
				level: 1,
				id: 1,
				completed: true,
				moves: [{ move: 0, time: 0 }, { move: 1, time: 2 }],
			},
		]);
	});

	test('UPDATE_SCORE - enters another score', () => {
		expect(
			reducer(
				[
					{
						levelTime: 1,
						playerName: 'Bojan',
						level: 1,
						id: 0,
						completed: true,
						moves: [{ move: 0, time: 0 }, { move: 1, time: 1 }],
					},
				],
				{
					type: actionTypes.UPDATE_SCORE,
					level: 2,
					timer: 1,
					scoreId: 1,
					completed: false,
					playerName: 'Bojan',
				}
			)
		).toEqual([
			{
				levelTime: 1,
				playerName: 'Bojan',
				level: 1,
				id: 0,
				completed: true,
				moves: [{ move: 0, time: 0 }, { move: 1, time: 1 }],
			},
			{
				levelTime: 1,
				playerName: 'Bojan',
				level: 2,
				id: 1,
				completed: false,
				moves: [{ move: 0, time: 0 }, { move: 1, time: 1 }],
			},
		]);
	});

	test('UPDATE_SCORE - updates score again', () => {
		expect(
			reducer(
				[
					{
						levelTime: 1,
						playerName: 'Bojan',
						level: 1,
						id: 0,
						completed: true,
						moves: [{ move: 0, time: 0 }, { move: 1, time: 1 }],
					},
					{
						levelTime: 1,
						playerName: 'Bojan',
						level: 2,
						id: 1,
						completed: false,
						moves: [{ move: 0, time: 0 }, { move: 1, time: 1 }],
					},
				],
				{
					type: actionTypes.UPDATE_SCORE,
					level: 2,
					timer: 3,
					scoreId: 1,
					completed: true,
					playerName: 'Bojan',
				}
			)
		).toEqual([
			{
				levelTime: 1,
				playerName: 'Bojan',
				level: 1,
				id: 0,
				completed: true,
				moves: [{ move: 0, time: 0 }, { move: 1, time: 1 }],
			},
			{
				levelTime: 3,
				playerName: 'Bojan',
				level: 2,
				id: 1,
				completed: true,
				moves: [{ move: 0, time: 0 }, { move: 1, time: 1 }, { move: 2, time: 2 }],
			},
		]);
	});
});
