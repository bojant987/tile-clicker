/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { scoreById } from '../../Redux/selectors/topScores';
import openChart from '../../Redux/actions/openChart';

export class _TimesDropdown extends Component {
	static propTypes = {
		times: PropTypes.array.isRequired,
		showChart: PropTypes.func.isRequired,
		openedChart: PropTypes.any.isRequired,
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
		const { times, showChart, openedChart } = this.props;
		const { expanded } = this.state;
		const buttonClassNameModifier = expanded ? 'expanded' : 'collapsed';

		return (
			<div className="TimesDropdown">
				<span className="TimesDropdown__item">
					<span
						className={
							openedChart === times[0].scoreId
								? 'TimesDropdown__chartButton TimesDropdown__chartButton--active'
								: 'TimesDropdown__chartButton'
						}
						onClick={() => showChart(times[0].scoreId)}
						title="Open score chart"
					/>
					{`${(times[0].value / 1000).toFixed(1)} sec`}
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
										className={
											openedChart === time.scoreId
												? 'TimesDropdown__chartButton TimesDropdown__chartButton--active'
												: 'TimesDropdown__chartButton'
										}
										onClick={() => showChart(time.scoreId)}
										title="Open score chart"
									/>
									{`${(time.value / 1000).toFixed(1)} sec`}
								</span>
							);
					  })
					: null}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	score: scoreById(state),
	openedChart: state.openedChart,
});

const mapDispatchToProps = dispatch => ({
	showChart: scoreId => dispatch(openChart(scoreId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(_TimesDropdown);
