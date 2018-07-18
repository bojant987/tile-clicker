/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { scoreById } from '../../Redux/selectors/topScores';

const TimeLineChart = ({ score }) => {
	if (!score.id) return null;

	const { moves } = score;
	// get max number from all move times
	const maxMoveTime = Math.max(...moves.map(move => move.time)) + 1;
	const timeValues = [...Array(maxMoveTime).keys()];

	// a couple of constants
	const labelSpacing = 30;
	const labelTitleSpacing = 100;
	const maxX = 1000;
	const maxY = 600;

	// density of the points
	const xPointsDensity = maxX / moves.length > 160 ? 160 : maxX / moves.length;
	const yPointsDensity = maxY / maxMoveTime > 150 ? 150 : maxY / maxMoveTime;

	// length of x and y axis
	const xLength = moves.length * xPointsDensity + labelTitleSpacing;
	const yLength = maxMoveTime * yPointsDensity + labelTitleSpacing;
	// length of the whole thing
	const chartWidth = xLength + labelSpacing;
	const chartHeight = yLength + labelSpacing;

	// placement of x/y points
	const calculateXPoints = move => move * xPointsDensity + labelSpacing;
	const calculateYPoints = time => chartHeight - time * yPointsDensity - labelSpacing;

	const calculatePoints = () =>
		moves.map(({ move, time }) => `${calculateXPoints(move)},${calculateYPoints(time)}`).join(' ');

	return (
		<div className="TimeLineChart">
			<h4 className="h-marginB--lg">Score chart</h4>
			<svg
				viewBox={`0 0 ${chartWidth} ${chartHeight}`}
				style={{
					maxWidth: chartWidth,
					maxHeight: chartHeight,
					minWidth: chartWidth / 2,
					minHeight: chartHeight / 2,
				}}
				preserveAspectRatio="xMidYMid meet"
				className="TimeLineChart__chart"
			>
				<g className="TimeLineChart__axis">
					<line x1={labelSpacing} x2={labelSpacing} y1={labelSpacing} y2={yLength} />
				</g>

				<g className="TimeLineChart__axis">
					<line x1={labelSpacing} x2={chartWidth} y1={yLength} y2={yLength} />
				</g>

				<g className="TimeLineChart__xLabels">
					{moves.map(({ move }) => (
						<text key={move} x={calculateXPoints(move)} y={chartHeight}>
							{move}
						</text>
					))}
					<text x={xLength} y={chartHeight} className="TimeLineChart__labelTitle">
						Move
					</text>
				</g>

				<g className="TimeLineChart__yLabels">
					{timeValues.map((_value, index) => (
						<text key={index} x={0} y={calculateYPoints(index)}>
							{index}
						</text>
					))}
					<text x={0} y={labelSpacing - 20} className="TimeLineChart__labelTitle">
						Time
					</text>
				</g>

				<polyline fill="none" stroke="#0074d9" strokeWidth="2" points={calculatePoints()} />

				<g className="TimeLineChart__dots">
					{moves.map(({ move, time }, index) => (
						<circle key={index} cx={calculateXPoints(move)} cy={calculateYPoints(time)} r="6">
							<title>{`move ${move} - ${time} seconds`}</title>
						</circle>
					))}
				</g>
			</svg>
		</div>
	);
};

TimeLineChart.propTypes = {
	score: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	score: scoreById(state),
});

export default connect(mapStateToProps)(TimeLineChart);
