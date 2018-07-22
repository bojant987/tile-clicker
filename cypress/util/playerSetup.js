const playerSetup = playerName => {
	cy.get('[data-spec=actionOpenChoosePlayer]').click();
	cy.get('[data-spec=fieldPlayerName]').type(playerName);
	cy.get('[data-spec=actionSubmitPlayerName]').click();
	cy.get(`[data-spec=regionPlayersList_player_${playerName}]`).click();
	cy.get('.rodal-close').click();
};

export default playerSetup;
