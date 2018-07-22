import visitApp from '../util/visitApp';

context('Initial game state', () => {
	beforeEach(() => {
		visitApp();
	});

	it('choose level button should be disabled when no player is active', () => {
		cy.get('[data-spec=actionOpenChooseLevel]').should('be.disabled');
	});

	it('top scores button should be disabled when no player is active', () => {
		cy.get('[data-spec=actionOpenTopScores]').should('be.disabled');
	});

	it('shows initial game stats', () => {
		cy.get('[data-spec=textLevelTime]').should('have.text', '0');
		cy.get('[data-spec=textRemainingTiles]').should('have.text', '0');
		cy.get('[data-spec=textPlayerLives]').should('have.text', '1');
		cy.get('[data-spec=textCurrentLevel]').should('have.text', '1');
	});

	it('shows stats and board with inactive visual', () => {
		cy.get('[data-spec=regionGameStats]').should('have.class', 'GameStats--off');
		cy.get('[data-spec=regionTile_5-5]').should('have.class', 'Board__tile--off');
	});

	it('shows no player active message when you  try to play the game', () => {
		cy.get('[data-spec=regionTile_5-5]').click();

		cy.get('[data-spec=regionChoosePlayer]').should('be.visible');
		cy.get('[data-spec=textNoActivePlayer]').should('be.visible');
	});
});
