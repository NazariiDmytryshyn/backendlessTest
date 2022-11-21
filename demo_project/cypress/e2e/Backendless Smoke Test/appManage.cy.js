/// <reference types="cypress" />
const EMAIL_PROD = 'testnazarqa@gmail.com'
const PASSWORD_PROD = '111111'

describe('App Manage', () => {
    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        // cy.visit('/');
        // cy.get('input[type="email"]').type(EMAIL_PROD)
        //     .should('exist');

        // cy.get('input[type="password"]').type(PASSWORD_PROD)
        //     .should('exist');

        // cy.contains('button', 'LOGIN')
        //     .should('exist')
        //     .click();
    });
    beforeEach(() => {
        cy.visit('/');
        // cy.Cookies.preserveOnce('dev-auth-key', 'JSESSIONID', 'dev-last-used-app-id')
    });
    it('Create App', () => {
        const randomNumber = Math.random().toString().slice(2);
        const AppName = `CypressApp${randomNumber}`

        cy.contains('span', 'Sign in')
            .should('exist');

        cy.get('input[type="email"]').type(EMAIL_PROD)
            .should('exist');

        cy.get('input[type="password"]').type(PASSWORD_PROD)
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

        cy.contains('span', 'Manage')
            .should('exist');

        cy.url()
            .should('include', '/manage');

        cy.contains('a', 'Create new app')
            .should('exist')
            .click();

        cy.contains('h4', 'Create New App')
            .should('exist');

        cy.contains('label', 'App Name')
            .should('exist')

        cy.get('label').contains('App Name')
            .siblings()
            .type('NewApp');

        cy.get('.app-subdomain-label > label')
            .should('exist');

        cy.get('.app-subdomains-select > .Select__control > .Select__value-container > .Select__single-value')
            .should('exist');

        cy.contains('div', 'Choose a blueprint to create an app from')
            .should('exist');

        cy.get('.marketplace-products-browser-categories-select > .Select__control')
            .should('exist');

        cy.get('.marketplace-products-browser-sorting-select > .Select__control')
            .should('exist');

        cy.contains('div', 'Blank App')
            .should('exist')
            .click();

        cy.contains('button', 'Create')
            .should('exist')
            .click()

        cy.wait(12000);

        cy.contains('button[class="apps-select dropdown-toggle btn btn-primary"]', 'NewApp')
            .should('exist')

        cy.get('#apps-select')
            .should('exist')
            .click()

        cy.contains('.apps-menu-list > .active > a', 'NewApp')
            .should('exist')
            .click()

        cy.get('.delete-app > .btn')
            .should('exist')
            .click()

        cy.get('.modal-body > .form-control')
            .should('exist')
            .type('DELETE NewApp')

        cy.wait(400);
        cy.contains('button[class="btn btn-danger"]', 'Delete')
            .should('exist')
            .click()
            // cy.wait(4000);
            // cy.get('.alert-content', 'Application has deleted successfully')
            //     .should('exist')

    });
    it('Create APP with existent name', () => {
        cy.contains('span', 'Sign in')
            .should('exist');

        cy.get('input[type="email"]').type(EMAIL_PROD)
            .should('exist');

        cy.get('input[type="password"]').type(PASSWORD_PROD)
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

        cy.contains('label', 'App Name')
            .should('exist')

        cy.get('label').contains('App Name')
            .siblings()
            .type('test');

        cy.contains('label', 'Subdomain Name')
            .should('exist');

        cy.contains('div', 'Blank App')
            .should('exist')
            .click();

        cy.contains('button', 'Create')
            .should('exist')
            .click();

        cy.contains('div', "Application 'test' already exists")
            .should('exist')

        cy.get('.app-name-option > .form-control').clear()

        cy.get('.app-name-option > .form-control')
            .type('123@(*^#@!$(*(*)!#$')

        cy.contains('button', 'Create')
            .should('exist')
            .click();

        cy.contains('span', "You can use only latin letters, numbers, and the underscore symbol ('_'). Values cannot begin with a number.")
            .should('exist')

        cy.get('.app-name-option > .form-control')
            .clear()

        cy.get('.app-name-option > .form-control')
            .type(' ')

        cy.contains('button', 'Create')
            .should('exist')
            .click();

        cy.contains('span', 'This field should not be empty')
            .should('exist')

        cy.get('.app-name-option > .form-control')
            .clear()
    });
    it('Clone App', () => {
        cy.contains('span', 'Sign in')
            .should('exist');

        cy.get('input[type="email"]').type(EMAIL_PROD)
            .should('exist');

        cy.get('input[type="password"]').type(PASSWORD_PROD)
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

        cy.get('#apps-select')
            .should('contain', 'CypressApp1');

        cy.contains('button', 'Clone')
            .should('exist')
            .click();

        cy.get('label').contains('App Name')
            .siblings()
            .type('CloneCypressApp1');

        cy.contains('label', 'Subdomain Name:')
            .should('exist')

        cy.get('.app-subdomains-select > .Select__control')
            .should('exist');

        cy.get('.modal-footer > .btn > span')
            .should('exist')
            .click();

        cy.contains('div', 'Backendless is cloning the app. You will receive an email message as soon as the clone process is complete')
            .should('exist')

        cy.contains('button', 'Clone')
            .should('exist')
            .click();

        cy.get('label').contains('App Name')
            .siblings()
            .type('CloneCypressApp1');

        cy.get('.modal-footer > .btn > span')
            .should('exist')
            .click();

        cy.contains('div', 'Currently the database is being modified by operation: CLONING.')
            .should('exist')

        cy.wait(130000);

        cy.reload();

        cy.get('#apps-select')
            .click();

        cy.get(':nth-child(1) > a > .app-name')
            .should('exist');



    })
    it('Delete App', () => {
        cy.contains('span', 'Sign in')
            .should('exist');

        cy.get('input[type="email"]').type(EMAIL_PROD)
            .should('exist');

        cy.get('input[type="password"]').type(PASSWORD_PROD)
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

        cy.get('.danger-tab-item > a')
            .click()

        cy.get('#delete-app > .panel__icon-holder')
            .should('exist');

        cy.contains('div', 'Delete Application')
            .should('exist');

        cy.contains('p', 'Removing the application is an irreversible operation, all data will be deleted with the application')
            .should('exist');

        cy.get('.delete-app > .btn > span')
            .should('exist')
            .click();

        cy.contains('div', 'Delete App Confirmation')
            .should('exist');

        cy.contains('.text-sm', 'Type in the word DELETE CloneCypressApp1 below to confirm action:')
            .should('exist');

        cy.get('.modal-body > .form-control')
            .should('exist')
            .type('DELETE CloneCypressApp1')
        cy.wait(400);
        cy.contains('button[class="btn btn-danger"]', 'Delete')
            .should('exist')
            .click()

        cy.wait(2500);
        cy.get('.alert-content', 'Application has deleted successfully')
            .should('exist')

        cy.clearCookies();
        cy.clearLocalStorage();
    })
});