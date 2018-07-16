import React from 'react';
import { shallow } from 'enzyme';

import { _ChoosePlayer as ChoosePlayer } from '../src/Components/ChoosePlayer/ChoosePlayer';

describe('ChoosePlayer', () => {
	const compProps = {
		create: () => {},
		choose: () => {},
		players: [],
		activePlayer: {},
	};

	test('sets error for player name not being long enough', () => {
		const component = shallow(<ChoosePlayer {...compProps} />);

		component.find('.Input').simulate('change', { target: { value: 'qw' } });
		component.find('.ChoosePlayer__create').simulate('submit', { preventDefault: () => {} });

		expect(component.find('.ChoosePlayer__error').length).toEqual(1);
		expect(component.find('.ChoosePlayer__error').text()).toEqual('*Please enter at least 3 characters');

		component.unmount();
	});

	test('sets error for player name being duplicate', () => {
		const component = shallow(<ChoosePlayer {...compProps} players={[{ name: 'Jovan' }, { name: 'Bojan' }]} />);

		component.find('.Input').simulate('change', { target: { value: 'Bojan' } });
		component.find('.ChoosePlayer__create').simulate('submit', { preventDefault: () => {} });

		expect(component.find('.ChoosePlayer__error').length).toEqual(1);
		expect(component.find('.ChoosePlayer__error').text()).toEqual('*Name is already taken');

		component.unmount();
	});

	test('shows message when there is no active player', () => {
		const component = shallow(<ChoosePlayer {...compProps} />);

		expect(component.find('.ChoosePlayer__noActive').length).toEqual(1);

		component.unmount();
	});

	test("doesn't show message when there is active player", () => {
		const component = shallow(<ChoosePlayer {...compProps} activePlayer={{ name: 'Bojan' }} />);

		expect(component.find('.ChoosePlayer__noActive').length).toEqual(0);

		component.unmount();
	});

	test('shows message when there are no players to choose from', () => {
		const component = shallow(<ChoosePlayer {...compProps} />);

		expect(component.find('.ChoosePlayer__noPlayers').length).toEqual(1);
		expect(component.find('.ChoosePlayer__playerListItem').length).toEqual(0);

		component.unmount();
	});

	test('shows players to choose from when available', () => {
		const component = shallow(<ChoosePlayer {...compProps} players={[{ name: 'Jovan' }, { name: 'Bojan' }]} />);

		expect(component.find('.ChoosePlayer__noPlayers').length).toEqual(0);
		expect(component.find('.ChoosePlayer__playerListItem').length).toEqual(2);

		component.unmount();
	});

	test('sets active player when chosen', () => {
		const component = shallow(
			<ChoosePlayer
				{...compProps}
				players={[{ name: 'Jovan' }, { name: 'Bojan' }]}
				activePlayer={{ name: 'Bojan' }}
			/>
		);

		expect(component.find('.ChoosePlayer__playerListItem--active').length).toEqual(1);

		component.unmount();
	});

	test('shows pointer icon on active player', () => {
		const component = shallow(
			<ChoosePlayer
				{...compProps}
				players={[{ name: 'Jovan' }, { name: 'Bojan' }]}
				activePlayer={{ name: 'Bojan' }}
			/>
		);

		expect(
			component.find('.ChoosePlayer__playerListItem--active .ChoosePlayer__playerListItemIcon').length
		).toEqual(1);

		component.unmount();
	});
});
