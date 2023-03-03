describe("Registration flow", () => {
    beforeEach(() => {
        cy.visit("https://stage.backendless.com/login");
    });

    it("should register a new user", () => {
        // Fill out the registration form
        cy.get('.create-account-link').click();
        cy.get('input[name="fullName"]').type("John Doe");
        cy.get('input[type="email"]').type("johndoe@example.com");
        cy.get('input[name="pwd"]').type("password123");
        cy.get('input[name="confirmPassword"]').type("password123");

        // Bypass the reCaptcha
        Cypress.Commands.add('confirmCaptcha', function() {
            cy.get('iframe')
                .first()
                .then((recaptchaIframe) => {
                    const body = recaptchaIframe.contents()
                    cy.wrap(body).find('.recaptcha-checkbox-border').should('be.visible').click()
                })
        })

        cy.confirmCaptcha()


        // Submit the form
        cy.get("[data-test=submit]").click();

        // Check that the user is redirected to the homepage
        cy.url().should("eq", "https://stage.backendless.com/home");

        // Check that the confirmation email was sent
        cy.task("fetchEmails", { address: "johndoe@example.com" }).then(emails => {
            expect(emails).to.have.length(1);
            expect(emails[0].subject).to.eq("Please confirm your email address");
        });
    });
});