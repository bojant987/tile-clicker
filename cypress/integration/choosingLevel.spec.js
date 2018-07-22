import visitApp from '../util/visitApp';
import playerSetup from '../util/playerSetup';
import completeLevels from '../util/completeLevels';

context('Choosing level', () => {
	before(() => {
		visitApp();
		playerSetup('Bojan');
		completeLevels(3);
	});

	it('cant choose a level above player progress', () => {
		cy.get('[data-spec=actionOpenChooseLevel]').click();
		cy.get('[data-spec=regionChooseLevel] .Select').click();

		cy.get('[data-spec=regionChooseLevel] .Select-menu>div:last-of-type').should('have.text', '4');
		cy.get('.rodal-close').click();
	});

	it('shows proper level in game stats after level selection', () => {
		cy.get('[data-spec=actionOpenChooseLevel]').click();
		cy.get('[data-spec=regionChooseLevel] .Select').click();

		cy.get('[data-spec=regionChooseLevel] .Select-menu>div:nth-of-type(2)').click();
		cy.get('[data-spec=actionChooseLevel]').click();

		cy.get('[data-spec=textCurrentLevel]').should('have.text', '2');
	});

	it('allows player to return to latest progress level', () => {
		cy.get('[data-spec=regionTile_5-5]').click();
		cy.get('.Board__tile--active')
			.first()
			.click();
		cy.get('.Board__tile--active')
			.first()
			.click();
		cy.get('.rodal-close').click();

		cy.get('[data-spec=actionOpenChooseLevel]').click();
		cy.get('[data-spec=regionChooseLevel] .Select').click();

		cy.get('[data-spec=regionChooseLevel] .Select-menu>div:last-of-type').should('have.text', '4');
		cy.get('.rodal-close').click();
	});

	it('aborts current level if in progress when choosing a level', () => {
		cy.get('[data-spec=regionTile_5-5]').click();
		cy.get('.Board__tile--active')
			.first()
			.click();

		cy.get('[data-spec=actionOpenChooseLevel]').click();
		cy.get('[data-spec=regionChooseLevel] .Select').click();

		cy.get('[data-spec=regionChooseLevel] .Select-menu>div:last-of-type').click();
		cy.get('[data-spec=actionChooseLevel]').click();

		cy.get('.Board__tile--active').should('not.exist');
		cy.get('.Board__tile--idle').should('not.exist');
		cy.get('.Board__tile--passive').should('not.exist');
	});
});
