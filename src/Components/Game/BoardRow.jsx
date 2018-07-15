import React from 'react';
import PropTypes from 'prop-types';

import Tile from './Tile';
import ENTRIES from '../../Redux/constants/grid';

const BoardRow = ({ yPos }) => (
	<div className="Board__row">{ENTRIES.map(xPos => <Tile key={xPos} xPos={xPos} yPos={yPos} />)}</div>
);

BoardRow.propTypes = {
	yPos: PropTypes.number.isRequired,
};

export default BoardRow;
