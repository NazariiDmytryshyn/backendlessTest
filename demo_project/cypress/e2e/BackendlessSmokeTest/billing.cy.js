/// <reference types="cypress" />




describe('App Manage', () => {
    before(() => {
        cy.visit('/');
        cy.get('input[type="email"]').type(EMAIL_PROD)
            .should('exist');

        cy.get('input[type="password"]').type(PASSWORD_PROD)
            .should('exist');

        cy.contains('button', 'LOGIN')
            .should('exist')
            .click();
    });
    it('Add Billing Plan and Clon App', () => {
        cy.contains('span', 'Sign in')
            .should('exist');

        cy.get('input[type="email"]')
            .type(EMAIL_PROD)
            .should('exist');

        cy.get('input[type="password"]')
            .type(PASSWORD_PROD)
            .should('exist');

        cy.contains('button', 'LOGIN')
            .should('exist')
            .click();

        cy.wait(7000);
        cy.contains('button', 'Continue')
            .should('exist')
            .click();

        cy.contains('span', 'Do not show this message')
            .should('exist')
            .click();

        cy.contains('button', 'Close')
            .should('exist')
            .click();

        cy.contains('a', 'Create new app')
            .should('exist')
            .click();

        cy.contains('h4', 'Create New App')
            .should('exist');

        cy.get('label').contains('App Name')
            .siblings()
            .type('BlancApp');

        cy.contains('div', 'Blank App')
            .should('exist')
            .click();

        cy.contains('button', 'Create')
            .should('exist')
            .click();

        cy.wait(10000);

        cy.get('.icon-holder > .fa-dollar-sign')
            .should('exist')
            .click()

        cy.get('.current > .plan-content > :nth-child(2) > .btn')
            .should('exist')
            .click();

        cy.get('.Select__control')
            .parent()
            .click()

        cy.get('[id^="react-select"][id$="listbox"]')
            .within(() => {
                cy.contains('XXXX-XXXX-XXXX-1111').click()
            })
        cy.get('.modal-title > div')
            .should('exist');

        cy.contains('div', 'You are about to select a billing profile for an application that is on a TRIAL period. At the end of the trial period you will automatically be switched to and charged for the ')
            .should('exist');

        cy.contains('button[class="btn btn-warning disabled"]', 'Confirm')
            .should('exist');

        cy.get('.modal-body > .form-control')
            .should('exist')
            .type('CONFIRM');

        cy.get('.btn-warning > span')
            .should('exist')
            .click()
        cy.wait(1700);
        cy.contains('button', 'Switch to this plan')
            .should('exist')
            .click()

        cy.get('.modal-footer > .btn-success')
            .should('exist')
            .click()

        cy.wait(4000);

        cy.get('.current > .plan-header > .title')
            .should('contain', 'Cloud 99');

        cy.get('.product-icon-logo')
            .should('exist')
            .click();

        cy.contains('span', 'Manage')
            .should('exist');

        cy.contains('button', 'Clone')
            .should('exist')
            .click();

        cy.get('label').contains('App Name')
            .siblings()
            .type('CloneBlancApp');

        cy.contains('label', 'Subdomain Name:')
            .should('exist')

        cy.get('.app-subdomains-select > .Select__control')
            .should('exist');

        cy.get('.modal-footer > .btn > span')
            .should('exist')
            .click();

        cy.wait(60000);

        cy.reload();
        cy.clearCookies();
        cy.clearLocalStorage();
    })
})