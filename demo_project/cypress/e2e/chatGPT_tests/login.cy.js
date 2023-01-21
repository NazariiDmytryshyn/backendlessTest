describe('Login Form', () => {
    beforeEach(() => {
        cy.visit('https://devtest.backendless.com/login');
    });

    it('should display the login form', () => {
        cy.get('form').should('have.length', 1);
        cy.get('input[name="email"]').should('have.length', 1);
        cy.get('input[name="password"]').should('have.length', 1);
        cy.get('button[type="submit"]').should('have.length', 1);
    });

    it('should display an error message if the form is submitted without any data', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('div', "Invalid developer's login or password").should('exist');
    });

    it('should display an error message if the email is invalid', () => {
        cy.get('input[name="email"]').type('invalid@gmail.com');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click();
        cy.contains('div', "Invalid developer's login or password").should('exist');
    });

    it('should redirect to the dashboard if the login is successful', () => {
        cy.get('input[name="email"]').type('nazar.dmytryshyn@backendlessmail.com');
        cy.get('input[name="password"]').type('111111');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/app');
    });
});