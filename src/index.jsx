import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';

import App from './App';

require('../assets/styles/main.scss');

const render = Component => {
	ReactDOM.render(
		<HotContainer>
			<Component />
		</HotContainer>,
		document.getElementById('root')
	);
};

render(App);

ReactDOM.render(<App />, document.getElementById('root'));
