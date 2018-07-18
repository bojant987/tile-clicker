import reducer from '../src/Redux/reducers/players';
import actionTypes from '../src/Redux/constants/actionTypes';

describe('players reducer', () => {
	const players = [
		{ name: 'Milos', lives: 10, progress: 11 },
		{ name: 'Bojan', lives: 10, progress: 11 },
		{ name: 'Boris', lives: 10, progress: 11 },
	];

	test("COMPLETE_LEVEL - updates active player's progress when he finishes level for the first time", () => {
		expect(reducer(players, { type: actionTypes.COMPLETE_LEVEL, levelNr: 11, playerName: 'Bojan' })).toEqual([
			{ name: 'Milos', lives: 10, progress: 11 },
			{ name: 'Bojan', lives: 11, progress: 12 },
			{ name: 'Boris', lives: 10, progress: 11 },
		]);
	});

	test("COMPLETE_LEVEL - doesn't update player's progress if he finished this level already", () => {
		expect(reducer(players, { type: actionTypes.COMPLETE_LEVEL, levelNr: 3, playerName: 'Bojan' })).toEqual([
			{ name: 'Milos', lives: 10, progress: 11 },
			{ name: 'Bojan', lives: 11, progress: 11 },
			{ name: 'Boris', lives: 10, progress: 11 },
		]);
	});

	test("FAILED_LEVEL - resets player's progress if he lost more lives than he has", () => {
		expect(reducer(players, { type: actionTypes.FAILED_LEVEL, lives: 15, playerName: 'Bojan' })).toEqual([
			{ name: 'Milos', lives: 10, progress: 11 },
			{ name: 'Bojan', lives: -5, progress: 1 },
			{ name: 'Boris', lives: 10, progress: 11 },
		]);
	});

	test("FAILED_LEVEL - doesn't reset player's progress he has lives lefts", () => {
		expect(reducer(players, { type: actionTypes.FAILED_LEVEL, lives: 3, playerName: 'Bojan' })).toEqual([
			{ name: 'Milos', lives: 10, progress: 11 },
			{ name: 'Bojan', lives: 7, progress: 11 },
			{ name: 'Boris', lives: 10, progress: 11 },
		]);
	});

	test("BUILD_LEVEL - resets player's lives to 1 if he faced game over previously", () => {
		expect(
			reducer([players[0], { name: 'Bojan', lives: -5, progress: 1 }, players[2]], {
				type: actionTypes.BUILD_LEVEL,
				playerName: 'Bojan',
				level: { levelNr: 1 },
			})
		).toEqual([
			{ name: 'Milos', lives: 10, progress: 11 },
			{ name: 'Bojan', lives: 1, progress: 1 },
			{ name: 'Boris', lives: 10, progress: 11 },
		]);
	});
});
