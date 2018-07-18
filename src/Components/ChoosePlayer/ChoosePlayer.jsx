import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import createPlayer from '../../Redux/actions/createPlayer';
import choosePlayer from '../../Redux/actions/choosePlayer';
import handIcon from '../../../assets/img/pixeled-hand.svg';
import getActivePlayer from '../../Redux/selectors/activePlayer';

export class _ChoosePlayer extends Component {
	static propTypes = {
		create: PropTypes.func.isRequired,
		choose: PropTypes.func.isRequired,
		players: PropTypes.array.isRequired,
		activePlayer: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			newPlayerName: '',
			inputError: null,
		};
	}

	setNewPlayerName = event => {
		this.setState({ newPlayerName: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();

		const { create } = this.props;
		const { newPlayerName } = this.state;

		if (this.validatePlayerName(newPlayerName)) {
			create(newPlayerName);
			this.setState({ newPlayerName: '' });
		}
	};

	validatePlayerName = name => {
		const { players } = this.props;

		const alreadyExists = players.some(player => player.name === name);
		const isValid = name.length >= 3;

		this.setState({
			inputError: !isValid
				? '*Please enter at least 3 characters'
				: alreadyExists
					? '*Name is already taken'
					: null,
		});

		return isValid && !alreadyExists;
	};

	render() {
		const { choose, players, activePlayer } = this.props;
		const { newPlayerName, inputError } = this.state;

		return (
			<div className="ChoosePlayer">
				{!activePlayer.name ? (
					<h4 className="ChoosePlayer__noActive h-marginB--md">
						&gt; No clicking allowed until you select a player! &lt;
					</h4>
				) : null}

				<div className="ChoosePlayer__choose h-paddingALL--md h-textCenter">
					<h4 className="h-marginB--md">Choose a player</h4>
					<div className="ChoosePlayer__playerList">
						{players.length > 0 ? (
							players.map(player => (
								<span
									onClick={() => choose(player.name, player.progress)}
									className={
										activePlayer.name === player.name
											? 'ChoosePlayer__playerListItem ChoosePlayer__playerListItem--active'
											: 'ChoosePlayer__playerListItem'
									}
									key={player.name}
								>
									{player.name}
									{activePlayer.name === player.name ? (
										<img
											className="ChoosePlayer__playerListItemIcon"
											src={handIcon}
											alt="Pointer icon"
										/>
									) : null}
								</span>
							))
						) : (
							<p className="ChoosePlayer__noPlayers">Players? Never heard of them.</p>
						)}
					</div>
				</div>

				<p className="h-marginB--md h-marginT--md h-textCenter h-fontBold">OR</p>

				<form onSubmit={this.handleSubmit} className="ChoosePlayer__create h-paddingALL--md h-textCenter">
					<h4 className="h-marginB--md">Create new player</h4>
					<div className="InputGroup">
						<input
							className="Input h-marginB--sm"
							name="newPlayerName"
							type="text"
							value={newPlayerName}
							onChange={this.setNewPlayerName}
						/>
						<button type="submit" className="Button h-marginB--sm">
							Create
						</button>
					</div>
					{inputError ? <p className="ChoosePlayer__error">{inputError}</p> : null}
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	create: player => dispatch(createPlayer(player)),
	choose: (playerName, playerProgress) => dispatch(choosePlayer(playerName, playerProgress)),
});

const mapStateToProps = state => ({
	players: state.players,
	activePlayer: getActivePlayer(state),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(_ChoosePlayer);
