/// <reference types="cypress" />

const validPassword = '111111';
const randomNumber = Math.random().toString().slice(2);
const serverId = 'm4mj2g0y';
const serverDomain = 'm4mj2g0y.mailosaur.net';
const emailAddres = 'nazar@' + serverDomain
let emailConfirmationLink

describe('Login into Backendless', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.visit('/')
    });
    it('Registration possitive', () => {
        const randomNumber = Math.random().toString().slice(2);
        const userName = 'Nazar Dmytryshyn'
        cy.wait(2000)
        cy.contains('span', 'Sign in')
            .should('exist');

        cy.contains('a', 'Create Account')
            .should('exist')
            .click();

        cy.url()
            .should('include', '/registration');

        cy.contains('div', 'Backendless Account Registration')
            .should('exist');

        cy.contains('label', 'Full Name')
            .should('exist');

        cy.get('input[name="fullName"]').type(userName, { delay: 100 })
            .should('exist');

        cy.contains('label', 'Email')
            .should('exist');

        cy.get('input[name="email"]').type(emailAddres, { delay: 100 })
            .should('exist');

        cy.contains('label', 'Password')
            .should('exist');

        cy.get('input[name="pwd"]').type(validPassword, { delay: 100 })
            .should('exist');

        cy.contains('label', 'Confirm Password')
            .should('exist');

        cy.get('input[name="confirmPassword"]').type(validPassword, { delay: 100 })
            .should('exist');

        Cypress.Commands.add('confirmCaptcha', function() {
            cy.get('iframe')
                .first()
                .then((recaptchaIframe) => {
                    const body = recaptchaIframe.contents()
                    cy.wrap(body).find('.recaptcha-checkbox-border').should('be.visible').click()
                })
        })

        cy.confirmCaptcha()
        cy.wait(2000);
        cy.contains('span', 'Register').should('exist').click();
        cy.wait(2000);
        cy.contains('p', 'Your account has been created.')
            .should('exist');

        cy.contains('span', 'We sent an email with a confirmation link to your email address. As soon as your email is confirmed, you will be able to login to your Backendless account.')
            .should('exist')

        cy.contains('a', 'Login')
            .should('exist')
            .click()

    })
    it('Email Confirmation Registration', () => {
        cy.mailosaurGetMessage(serverId, {
            sentTo: emailAddres
        }).then(email => {
            cy.log(email.subject)
            emailConfirmationLink = email.html.links[0].herf
        })
    })
})