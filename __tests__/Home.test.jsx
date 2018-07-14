import React from 'react';
import { shallow } from 'enzyme';

import Home from '../src/Components/Home';

describe('Home', () => {
	test('sanity check', () => {
		const component = shallow(<Home />);

		expect(true).toBe(true);

		component.unmount();
	});
});
