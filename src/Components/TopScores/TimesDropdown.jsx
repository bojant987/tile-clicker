/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TimesDropdown extends Component {
	static propTypes = {
		times: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			expanded: false,
		};
	}

	toggleDropdown = () => {
		const { expanded } = this.state;

		this.setState({ expanded: !expanded });
	};

	render() {
		const { times } = this.props;
		const { expanded } = this.state;
		const buttonClassNameModifier = expanded ? 'expanded' : 'collapsed';

		return (
			<div className="TimesDropdown">
				<span className="TimesDropdown__item" onClick={this.toggleDropdown}>
					{`${times[0]} sec`}
					{times.length > 1 ? (
						<span className={`TimesDropdown__button TimesDropdown__button--${buttonClassNameModifier}`} />
					) : null}
				</span>
				{expanded
					? times.map((time, index) => {
							if (index === 0) return null;

							return (
								<span key={index} className="TimesDropdown__item">
									{`${time} sec`}
								</span>
							);
					  })
					: null}
			</div>
		);
	}
}
