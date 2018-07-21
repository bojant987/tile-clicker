import React from 'react';
import { shallow } from 'enzyme';

import { _Tile as Tile } from '../src/Components/Game/Tile';

describe('Tile', () => {
	const compProps = {
		buildNextLvl: () => {},
		updateLvl: () => {},
		xPos: 1,
		yPos: 1,
		nextLevel: 2,
		levelInProgress: false,
		levelNr: 1,
		levelTiles: {},
		activePlayer: {},
		openChoosePlayer: () => {},
		status: 'active',
		timer: 0,
		scoreId: 1,
	};

	test('sets status className properly', () => {
		const component = shallow(<Tile {...compProps} />);

		expect(component.find('.Board__tile--active').length).toEqual(1);

		component.unmount();
	});

	test('calls openChoosePlayer when there is no active player', () => {
		const spy = jest.fn();
		const component = shallow(<Tile {...compProps} openChoosePlayer={spy} />);

		component.find('.Board__tile').simulate('click');

		expect(spy).toHaveBeenCalledTimes(1);

		component.unmount();
	});

	test('calls buildNextLvl when there is no level in progress', () => {
		const spy = jest.fn();
		const component = shallow(<Tile {...compProps} buildNextLvl={spy} activePlayer={{ name: 'Bojan' }} />);

		component.find('.Board__tile').simulate('click');

		expect(spy).toHaveBeenCalledTimes(1);

		component.unmount();
	});

	test('calls updateLvl when there is level in progress', () => {
		const spy = jest.fn();
		const component = shallow(
			<Tile {...compProps} updateLvl={spy} activePlayer={{ name: 'Bojan' }} levelInProgress />
		);

		component.find('.Board__tile').simulate('click');

		expect(spy).toHaveBeenCalledTimes(1);

		component.unmount();
	});
});
