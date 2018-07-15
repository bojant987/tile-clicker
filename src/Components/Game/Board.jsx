import React from 'react';
// import PropTypes from 'prop-types';

import BoardRow from './BoardRow';
import ENTRIES from '../../Redux/constants/grid';

// reversed, a bit more natural to think in cartesian coordinate system
const reversedEntries = [...ENTRIES].reverse();

const Board = () => (
	<div className="Board">
		<div className="Board__content">{reversedEntries.map(yPos => <BoardRow key={yPos} yPos={yPos} />)}</div>
	</div>
);

export default Board;
