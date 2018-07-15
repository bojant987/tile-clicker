import React from 'react';
// import PropTypes from 'prop-types';

const Footer = () => (
	<div className="Footer">
		<p className="Footer__author">made by Bojan Todorovic, July 2018. </p>
		<div className="Footer__iconsCredit">
			{'Icons made by '}
			<a href="https://www.flaticon.com/authors/vectorgraphit" title="Vectorgraphit">
				Vectorgraphit{' '}
			</a>
			{'from '}
			<a href="https://www.flaticon.com/" title="Flaticon">
				www.flaticon.com{' '}
			</a>
			{'is licensed by '}
			<a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">
				CC 3.0 BY
			</a>
		</div>
	</div>
);

export default Footer;
