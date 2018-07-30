import visitApp from '../util/visitApp';
import playerSetup from '../util/playerSetup';
import completeLevels from '../util/completeLevels';

context('Failing level', () => {
	before(() => {
		visitApp();
		playerSetup('Bojan');
		completeLevels(3);
	});

	it('shows error message when level is failed', () => {
		cy.get('[data-spec=regionTile_5-5]').click();
		cy.get('.Board__tile--active')
			.first()
			.click();
		cy.get('.Board__tile--active')
			.first()
			.click();
		cy.get('.Board__tile--idle')
			.first()
			.click();

		cy.get('[data-spec=regionLevelFailure]').should('be.visible');
		cy.get('[data-spec=textLevelFailureMessage]').should('have.text', 'Oh no, what have you done?');
		cy.get('.rodal-close').click();
	});

	it("doesn't reset level to 1 if player has remaining lives", () => {
		cy.get('[data-spec=textCurrentLevel]').should('have.text', '4');
	});

	it('removes lives from player properly', () => {
		cy.get('[data-spec=textPlayerLives]').should('have.text', '2');
	});

	it('shows error message when player is out of lives', () => {
		cy.get('[data-spec=regionTile_5-5]').click();
		cy.get('.Board__tile--idle')
			.first()
			.click();

		cy.get('[data-spec=regionLevelFailure]').should('be.visible');
		cy.get('[data-spec=textLevelFailureMessage]').should('have.text', "Now you've done it. Game over.");
		cy.get('.rodal-close').click();
	});

	it('resets level to 1 if player is out of lives', () => {
		cy.get('[data-spec=textCurrentLevel]').should('have.text', '1');
	});

	it('resets lives to 1 as soon as player starts the game again', () => {
		cy.get('[data-spec=regionTile_5-5]').click();
		cy.get('[data-spec=textPlayerLives]').should('have.text', '1');
	});
});
