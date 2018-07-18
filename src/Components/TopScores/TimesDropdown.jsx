/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TimesDropdown extends Component {
	static propTypes = {
		times: PropTypes.array.isRequired,
		showChart: PropTypes.func.isRequired,
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
		const { times, showChart } = this.props;
		const { expanded } = this.state;
		const buttonClassNameModifier = expanded ? 'expanded' : 'collapsed';

		return (
			<div className="TimesDropdown">
				<span className="TimesDropdown__item">
					<span
						className="TimesDropdown__chartButton"
						onClick={() => showChart(times[0].scoreId)}
						title="Open score chart"
					/>
					{`${times[0].value} sec`}
					{times.length > 1 ? (
						<span
							onClick={this.toggleDropdown}
							className={`TimesDropdown__button TimesDropdown__button--${buttonClassNameModifier}`}
						/>
					) : null}
				</span>
				{expanded
					? times.map((time, index) => {
							if (index === 0) return null;

							return (
								<span key={index} className="TimesDropdown__item">
									<span
										className="TimesDropdown__chartButton"
										onClick={() => showChart(time.scoreId)}
										title="Open score chart"
									/>
									{`${time.value} sec`}
								</span>
							);
					  })
					: null}
			</div>
		);
	}
}
