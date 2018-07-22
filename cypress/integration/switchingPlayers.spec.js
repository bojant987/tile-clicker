import visitApp from '../util/visitApp';
import playerSetup from '../util/playerSetup';
import completeLevels from '../util/completeLevels';

context('Choosing level', () => {
	before(() => {
		visitApp();
		playerSetup('Milos');
		completeLevels(2);
		playerSetup('Bojan');
		completeLevels(4);
	});

	it('shows icon indicator on selected player', () => {
		cy.get('[data-spec=textCurrentLevel]').should('have.text', '5');

		cy.get('[data-spec=actionOpenChoosePlayer]').click();
		cy.get('[data-spec=regionPlayersList_player_Milos]').click();
		cy.get('[data-spec=regionPlayersList_activeIcon_Milos]').should('be.visible');
		cy.get('.rodal-close').click();
	});

	it('shows proper player progress and lives in game stats', () => {
		cy.get('[data-spec=textCurrentLevel]').should('have.text', '3');
		cy.get('[data-spec=textPlayerLives]').should('have.text', '3');

		cy.get('[data-spec=actionOpenChoosePlayer]').click();
		cy.get('[data-spec=regionPlayersList_player_Bojan]').click();
		cy.get('.rodal-close').click();

		cy.get('[data-spec=textCurrentLevel]').should('have.text', '5');
		cy.get('[data-spec=textPlayerLives]').should('have.text', '5');
	});

	it('aborts level if it was in progress when switching a player', () => {
		cy.get('[data-spec=regionTile_5-5]').click();
		cy.get('.Board__tile--active')
			.first()
			.click();
		cy.get('.Board__tile--active')
			.first()
			.click();

		cy.get('[data-spec=actionOpenChoosePlayer]').click();
		cy.get('[data-spec=regionPlayersList_player_Milos]').click();
		cy.get('.rodal-close').click();

		cy.get('.Board__tile--active').should('not.exist');
		cy.get('.Board__tile--idle').should('not.exist');
		cy.get('.Board__tile--passive').should('not.exist');
	});
});
