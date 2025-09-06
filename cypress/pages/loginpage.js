class LoginPage {
  openLogin() {
    cy.visit('/', {
      auth: {
        username: Cypress.env('basicAuthUser'),
        password: Cypress.env('basicAuthPass')
      }
    });
    cy.contains(/sign in/i).click();
  }

  login(email, password) {
    cy.get('#signinEmail').type(email);
    cy.get('#signinPassword').type(password);
    cy.contains('button', 'Login').click();
  }
}

export default new LoginPage();