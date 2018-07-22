import visitApp from '../util/visitApp';

context('Player creation', () => {
	beforeEach(() => {
		visitApp();
		cy.get('[data-spec=actionOpenChoosePlayer]').click();
	});

	it('shows message when no players to choose from', () => {
		cy.get('[data-spec=textNoPlayers]').should('be.visible');
	});

	it('shows error message for too short player name', () => {
		cy.get('[data-spec=fieldPlayerName]').type('qw');
		cy.get('[data-spec=actionSubmitPlayerName]').click();

		cy.get('[data-spec=textInputError]')
			.should('be.visible')
			.should('have.text', '*Please enter at least 3 characters');
	});

	it('shows error message when name already taken', () => {
		cy.get('[data-spec=fieldPlayerName]').type('Bojan');
		cy.get('[data-spec=actionSubmitPlayerName]').click();

		cy.get('[data-spec=fieldPlayerName]').type('Bojan');
		cy.get('[data-spec=actionSubmitPlayerName]').click();

		cy.get('[data-spec=textInputError]')
			.should('be.visible')
			.should('have.text', '*Name is already taken');
	});

	it('shows player name in the choose list after creation', () => {
		cy.get('[data-spec=fieldPlayerName]').type('Bojan');
		cy.get('[data-spec=actionSubmitPlayerName]').click();

		cy.get('[data-spec=regionPlayersList_player_Bojan]')
			.should('be.visible')
			.should('have.text', 'Bojan');
	});

	it('shows selected icon after choosing a player', () => {
		cy.get('[data-spec=fieldPlayerName]').type('Bojan');
		cy.get('[data-spec=actionSubmitPlayerName]').click();
		cy.get('[data-spec=regionPlayersList_player_Bojan]').click();

		cy.get('[data-spec=regionPlayersList_activeIcon_Bojan]').should('be.visible');
	});
});
