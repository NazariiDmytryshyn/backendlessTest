// {
//     "baseUrl": "https://eu-develop.backendless.com/login"
// }
/// <reference types="cypress" />
const EMAIL_PROD = 'nazar.dmytryshyn@backendlessmail.com';
const PASSWORD_PROD = '111111';
const NON_EXISTENT_EMAIL = 'nonExistentEmail@gmail.com'
const INVALID_PASSWORD = 'qweqweqweqweqweqw9812347981278391'
const googleClientId = '239518018429-31kn720e2apm361eqmb3vnsga1rc2er3.apps.googleusercontent.com'
const googleClientSecret = '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'
const googleRefreshToken = ''

describe('Login into Backendless', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    it('Login possitive', () => {
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

        cy.get('.avatar-menu > img')
            .should('exist')
            .click();

        cy.wait(1500);
        cy.url()
            .should('include', '/account/info');

        cy.contains('button', 'Logout')
            .should('exist')
            .click();

        cy.wait(1500);
        cy.contains('span', 'Sign in')
            .should('exist');
    });
    it('Negative Login', () => {
        cy.contains('span', 'Sign in')
            .should('exist');

        cy.url()
            .should('include', '/login');

        cy.get('input[type="email"]').type(NON_EXISTENT_EMAIL)
            .should('exist');

        cy.get('input[type="password"]').type(INVALID_PASSWORD)
            .should('exist');

        cy.contains('button', 'LOGIN')
            .should('exist')
            .click();

        cy.contains('div', "Invalid developer's login or password").should('exist');

        cy.get('input[type="password"]').clear();

        cy.contains('button', 'LOGIN')
            .should('exist')
            .click();

        cy.contains('div', "Invalid developer's login or password")
            .should('exist');

        cy.get('input[type="email"]').clear();

        cy.contains('button', 'LOGIN')
            .should('exist')
            .click();

        cy.contains('div', "Invalid developer's login or password")
            .should('exist');
    });
    it('Login via GOOGLE', () => {
        cy.contains('span', 'Sign in')
            .should('exist');

        cy.request({
            method: 'POST',
            url: 'https://www.googleapis.com/oauth2/v4/token',
            body: {
                grant_type: 'refresh_token',
                client_id: Cypress.env('googleClientId'),
                client_secret: Cypress.env('googleClientSecret'),
                refresh_token: Cypress.env('googleRefreshToken'),
            },
        }).then(({ body }) => {
            const { id_token } = body
        })
    })
});