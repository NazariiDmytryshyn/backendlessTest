/// <reference types="cypress" />

const currentPass = '111111';
const serverId = 'jkhq2raa'
const testEmail = `nazar@${serverId}.mailosaur.net`

const newPass = 'Yfpsr_789456123'


describe('Restore password', () => {
    it('Send request to restore password', () => {
        cy.visit('/')

        cy.contains('span', 'Sign in')
            .should('exist');

        cy.contains('a', 'Forgot password?')
            .should('exist')
            .click();

        cy.url()
            .should('include', '/restore-password');

        cy.contains('span', 'Request Password Change')
            .should('exist');

        cy.contains('label', 'Email Address')
            .should('exist');

        cy.get('input[type="email"]').should('exist')
            .type(testEmail);

        cy.contains('a', 'Back to Login')
            .should('exist')

        cy.contains('button', 'Send email')
            .should('exist')
            .click();

        cy.contains('p', 'We sent an email with a link to change password to your email address. Please check your email and follow the link for further instructions.')
            .should('exist');

        cy.contains('a', 'Login')
            .should('exist')
            .click();

    })
    it('Gets a Password Reset email', () => {
        cy.mailosaurGetMessage(serverId, {
            sentTo: testEmail
        }).then(email => {
            expect(email.subject).to.equal('Backendless Restore Password');
            passwordResetLink = email.html.links[0].href;
        })
    })

    //     it('Confirm and restor password', () => {
    //         cy.wait(2000)
    //         cy.visit(passwordResetLink)

    //         cy.contains('label', 'Password (at least 5 characters):')
    //             .should('exist');

    //         cy.get('input[name="pwd"]').should('exist')
    //             .type(newPass)

    //         cy.get('input[name="pwd_conf"]').should('exist')
    //             .type(newPass)

    //         cy.get('input[value="Restore"]')
    //             .should('exist')
    //             .click()
    //     })
})