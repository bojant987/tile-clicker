import visitApp from '../util/visitApp';
import playerSetup from '../util/playerSetup';

context('Completing level', () => {
	before(() => {
		visitApp();
		playerSetup('Bojan');
	});

	it('removes dimmed out visuals upon level start', () => {
		cy.get('[data-spec=regionTile_5-5]').click();

		cy.get('[data-spec=regionGameStats]').not('.GameStats--off');
	});

	it('shows proper remaining tiles', () => {
		cy.get('[data-spec=regionTile_5-5]').click();
		cy.get('[data-spec=textRemainingTiles]').should('have.text', '1');
	});

	it('shows proper level time', () => {
		cy.get('[data-spec=regionTile_5-5]').click();
		cy.wait(3000);
		cy.get('[data-spec=textLevelTime]').should('have.text', '3');
	});

	it('shows success message upon level completion', () => {
		cy.get('[data-spec=regionTile_5-5]').click();
		cy.get('.Board__tile--active')
			.first()
			.click();

		cy.get('[data-spec=regionLevelSuccess]').should('be.visible');
	});

	it('ups lives and level by 1 upon completion', () => {
		cy.get('[data-spec=textPlayerLives]').should('have.text', '2');
		cy.get('[data-spec=textCurrentLevel]').should('have.text', '2');
	});
});
