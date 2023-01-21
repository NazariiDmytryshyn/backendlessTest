describe('Google login', () => {
    it('should log in with Google', () => {
        cy.visit('https://stage.backendless.com/login');

        // Click on the Google login button
        cy.get('.google').should('be.visible').then(() => {
            cy.get('.google').click();
        });

        // Switch to the Google sign-in window
        cy.on('window:alert', (str) => {
            expect(str).to.equal('This is a Google Sign-in window. Proceed with the sign-in process.');
        });
        // cy.window().then(win => {
        //     cy.stub(win, 'open').as('windowOpen');
        // });
        // cy.get('@windowOpen').should('be.called');

        // Enter email and password
        cy.origin('https://accounts.google.com/', () => {
            cy.get('#identifierId').type('nazarter98@gmail.com');
            cy.get('#identifierNext').click();
            cy.get('#password').type('Yfpsr_789456123');
            cy.get('#passwordNext').click();
        })

        // Check if the user is successfully logged in
        //   cy.get('.logged-in-message').should('exist');
        //   cy.get('.logged-in-message').should('contain', 'You are logged in');
    });
});