describe('Login via Google', function() {
    it('logs in successfully', function() {
        cy.visit('https://stage.backendless.com/login')
        cy.contains('span', 'GOOGLE').click()
        cy.get('#identifierId').type('<your-email-address>')
        cy.get('#identifierNext').click()
        cy.get('#password').type('<your-password>')
        cy.get('#passwordNext').click()
        cy.get('.navbar-brand').should('contain', 'Backendless Console')
    })
})