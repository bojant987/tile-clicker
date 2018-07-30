const completeLevels = levels => {
	const levelsArray = [...Array(levels).keys()];

	levelsArray.forEach(index => {
		cy.get('[data-spec=regionTile_5-5]').click();
		const levelArray = [...Array(index + 1).keys()];

		levelArray.forEach(() => {
			cy.get('.Board__tile--active')
				.first()
				.click();
		});

		cy.get('.rodal-close').click();
	});
};

export default completeLevels;
