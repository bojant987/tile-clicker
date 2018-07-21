import React from 'react';
import { shallow } from 'enzyme';

import { _Game as Game } from '../src/Components/Game/Game';

describe('Game', () => {
	const compProps = {
		levelSuccess: false,
		levelFailure: false,
		levelNr: 0,
		remainingTiles: 0,
		remainingLives: 0,
	};

	test('shows success modal when level is finished', () => {
		const component = shallow(<Game {...compProps} levelSuccess />);

		expect(component.find('.Game__status--success').length).toEqual(1);

		component.unmount();
	});

	test('shows success modal with finished game message when level is 99', () => {
		const component = shallow(<Game {...compProps} levelSuccess levelNr={99} />);

		expect(component.find('.Game__status--finished').length).toEqual(1);

		component.unmount();
	});

	test('shows failure modal when level is finished', () => {
		const component = shallow(<Game {...compProps} levelFailure />);

		expect(component.find('.Game__status--failure').length).toEqual(1);

		component.unmount();
	});

	test('shows special failure message when player is out of lives', () => {
		const component = shallow(<Game {...compProps} levelFailure />);

		expect(component.find('.Game__status--failure h4').text()).toEqual("Now you've done it. Game over.");

		component.unmount();
	});
});
