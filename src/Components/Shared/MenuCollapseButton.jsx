import React from 'react';
import PropTypes from 'prop-types';

const MenuCollapseButton = ({ toggleMenu }) => (
	<button type="button" className="Header__menuCollapse" onClick={toggleMenu}>
		<span className="Header__menuCollapseBar" />
		<span className="Header__menuCollapseBar" />
		<span className="Header__menuCollapseBar" />
	</button>
);

export default MenuCollapseButton;
