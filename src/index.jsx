import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';

import 'rodal/lib/rodal.css';
import 'react-select/dist/react-select.css';
import '../assets/styles/main.scss';

import App from './App';

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
