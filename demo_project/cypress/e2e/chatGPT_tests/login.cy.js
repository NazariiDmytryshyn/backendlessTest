/// <reference types="cypress" />
import { generateUser } from '/Users/a840/work/ForWork/TestProjectCypress-Jest/backendless_cypress_test/backendlessTest/demo_project/cypress/support/generate_user.js'
describe('Sign Up page', () => {
    it('should provide an ability to register new account', () => {
        const { username, email, password } = generateUser();
        cy.visit('https://the-internet.herokuapp.com/login')
        cy.findPlaceholder('Username').type(username);

        cy.findPlaceholder('Email').type(email);
        cy.findPlaceholder('Password').type(password);
        cy.get('[type="submit"]').click();
        cy.get(`[href="#@${username}"]`).should('contain.text', username);
    });
});