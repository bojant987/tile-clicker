const APP_LOCATION = 'http://localhost:8080/';

const visitApp = () => {
	cy.visit(APP_LOCATION);
};

export default visitApp;
