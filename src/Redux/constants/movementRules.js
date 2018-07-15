const MOVEMENT_RULES = [
	{
		x: {
			operation: '+',
			value: 3,
		},
		y: {
			operation: null,
			value: 0,
		},
	},
	{
		x: {
			operation: '-',
			value: 3,
		},
		y: {
			operation: null,
			value: 0,
		},
	},
	{
		x: {
			operation: null,
			value: 0,
		},
		y: {
			operation: '+',
			value: 3,
		},
	},
	{
		x: {
			operation: null,
			value: 0,
		},
		y: {
			operation: '-',
			value: 3,
		},
	},
	{
		x: {
			operation: '+',
			value: 2,
		},
		y: {
			operation: '+',
			value: 2,
		},
	},
	{
		x: {
			operation: '-',
			value: 2,
		},
		y: {
			operation: '-',
			value: 2,
		},
	},
	{
		x: {
			operation: '-',
			value: 2,
		},
		y: {
			operation: '+',
			value: 2,
		},
	},
	{
		x: {
			operation: '+',
			value: 2,
		},
		y: {
			operation: '-',
			value: 2,
		},
	},
];

export default MOVEMENT_RULES;
