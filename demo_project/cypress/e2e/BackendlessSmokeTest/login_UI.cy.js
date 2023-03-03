// {
//     "baseUrl": "https://eu-develop.backendless.com/"
// }
/// <reference types="cypress" />


describe('Visual Sign In/Up Backendless', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Check visual part login page', () => {
        cy.get('div')
            .should('have.class', 'product-logo product-logo-block');

        cy.contains('span', 'Sign in')
            .should('exist');

        cy.contains('button', 'TWITTER')
            .should('exist');

        cy.contains('button', 'GITHUB')
            .should('exist');

        cy.contains('button', 'GOOGLE')
            .should('exist');

        cy.contains('span', 'or with your Backendless account')
            .should('exist');

        cy.contains('label', 'Email Address')
            .should('exist');

        cy.contains('label', 'Password')
            .should('exist');

        cy.get('input[type="email"]').type('nazarter98@gmail.com')
            .should('exist');

        cy.get('input[type="password"]').type('password123123123_12')
            .should('exist');

        cy.contains('a', 'Forgot password?')
            .should('exist');

        cy.contains('button', 'LOGIN')
            .should('exist');

        cy.contains('button', 'Resend Confirmation Email')
            .should('exist');

        cy.contains('a', 'Create Account')
            .should('exist');
    });


    it('Redirect Sign Up page', () => {
        cy.contains('a', 'Create Account')
            .should('exist')
            .click();

        cy.url()
            .should('include', '/registration');

        cy.contains('div', 'Backendless Account Registration')
            .should('exist');

        cy.contains('label', 'Full Name')
            .should('exist');

        cy.get('input[name="firstName"]').type('Nazar Dmytryshyn')
            .should('exist')

        cy.contains('label', 'Email')
            .should('exist')

        cy.get('input[name="email"]').type('newemail@email.com')
            .should('exist')

        cy.contains('label', 'Password')
            .should('exist')

        cy.get('input[name="pwd"]').type('111111')
            .should('exist')

        cy.contains('label', 'Confirm Password')
            .should('exist')

        cy.get('input[name="confirmPassword"]').type('111111')
            .should('exist')

        cy.contains('a', 'Login')
            .should('exist')
            .click();

        cy.contains('span', 'Sign in')
            .should('exist');
    });


    it('Redirect Recovery Password page', () => {
        cy.contains('a', 'Forgot password?')
            .should('exist')
            .click();

        cy.url()
            .should('include', '/restore-password');

        cy.contains('span', 'Request Password Change')
            .should('exist');

        cy.contains('label', 'Email Address')
            .should('exist');

        cy.get('input[type="email"]').type('newemail@email.com')
            .should('exist')

        cy.contains('button', 'Send email')
            .should('exist')

        cy.contains('a', 'Back to Login')
            .should('exist')
            .click();

        cy.contains('span', 'Sign in')
            .should('exist');
    });


    it('Resend Confirmation Email success', () => {
        cy.get('input[type="email"]').type('nazarter98@gmail.com')

        cy.contains('button', 'Resend Confirmation Email')
            .should('exist')
            .click();

        cy.contains('div', 'Registration confirmation was send to specified email')
            .should('exist');
    });
});