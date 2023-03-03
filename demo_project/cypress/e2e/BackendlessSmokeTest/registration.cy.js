/// <reference types="cypress" />
const existsEmail = 'nazar.dmytryshyn@backendlessmail.com'

describe('Registration page', () => {
    beforeEach(() => {
        cy.visit('https://stage.backendless.com/registration');
        // cy.visit('http://localhost:3000/registration')
    });

    it('register new users allowed', () => {
        cy.get('input[name="fullName"]').type("Nazar Dmytryshyn")
        cy.get('input[type="email"]').type('testuser@example.com');
        cy.get('input[name="pwd"]').type('testpassword');
        cy.get('input[name="confirmPassword"]').type('testpassword');
        cy.get('button[class="btn btn-success"]').click();

        const connection = mysql2.createConnection({
            host: '127.0.0.1:3306',
            user: 'root',
            password: 'rootpassword',
            database: 'main_backendless'
        });

        connection.connect();

        connection.query(
            'UPDATE `main_backendless`.`Developer` SET `developerStatusId` = "1" WHERE (`email` = "testuser@example.com")',
            (error, results) => {
                if (error) throw error;
                expect(results.affectedRows).to.equal(1);
            }
        );

        connection.end();

        cy.contains('a', 'Login').should('exist').click();
        cy.url().should('include', '/login');
    });

    it('rgister new user without name', () => {
        // cy.get('input[name="fullName"]').type("Nazar Dmytryshyn")
        cy.get('input[type="email"]').type('testuser1@example.com');
        cy.get('input[name="pwd"]').type('testpassword');
        cy.get('input[name="confirmPassword"]').type('testpassword');
        cy.get('button[class="btn btn-success"]').click();

        cy.contains('span', 'Full Name cannot be empty').should('exist');

    });

    it('should display an error message if passwords do not match', () => {
        cy.get('input[name="fullName"]').type("Nazar Dmytryshyn")
        cy.get('input[type="email"]').type('testuser1@example.com');
        cy.get('input[name="pwd"]').type('testpassword');
        cy.get('input[name="confirmPassword"]').type('differentPassword');
        cy.get('button[class="btn btn-success"]').click();

        cy.contains('span', 'Passwords do not match').should('exist');
        cy.get('input[name="pwd"]').clear();
        cy.get('input[name="confirmPassword"]').clear();


        cy.get('input[name="pwd"]').type('differentPassword');
        cy.get('input[name="confirmPassword"]').type('testPassword');
        cy.get('button[class="btn btn-success"]').click();

        cy.contains('span', 'Passwords do not match').should('exist');
    });

    it('should display an error message if email is already in use', () => {
        // Register a user with the email "testuser@example.com"
        cy.get('input[name="fullName"]').type("Nazar Dmytryshyn", { delay: 250 })
        cy.get('input[type="email"]').type('testuser@example.com', { delay: 250 });
        cy.get('input[name="pwd"]').type('testpassword', { delay: 250 });
        cy.get('input[name="confirmPassword"]').type('testpassword', { delay: 250 });

        cy.get('button[class="btn btn-success"]').click();

        // Assert that an error message is displayed
        cy.contains('div[role="alert"]', 'Developer with specified email already exists').should('exist');
    });
});