import React from 'react';
import { shallow } from 'enzyme';

import TimesDropdown from '../src/Components/TopScores/TimesDropdown';

describe('TimesDropdown', () => {
	const compProps = {
		times: [{ value: 1, scoreId: 0 }],
	};

	test("doesn't show expander button if there's only 1 time", () => {
		const component = shallow(<TimesDropdown {...compProps} />);

		expect(component.find('.TimesDropdown__button').length).toEqual(0);

		component.unmount();
	});

	test("shows expander button if there's more than 1 time", () => {
		const component = shallow(<TimesDropdown {...compProps} times={[0, 1, 5]} />);

		expect(component.find('.TimesDropdown__button').length).toEqual(1);

		component.unmount();
	});

	test("doesn't duplicate first time when expanded", () => {
		const component = shallow(
			<TimesDropdown
				{...compProps}
				times={[{ value: 1, scoreId: 0 }, { value: 5, scoreId: 1 }, { value: 3, scoreId: 2 }]}
			/>
		);

		component.setState({ expanded: true });

		expect(component.find('.TimesDropdown__item').length).toEqual(3);

		component.unmount();
	});
});
