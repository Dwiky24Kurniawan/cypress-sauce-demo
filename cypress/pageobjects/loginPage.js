class LoginPage {
  fieldUsername = "#user-name";
  fieldPassword = "#password";
  loginBtn = "#login-button";
  appLogo = ".app_logo";
  titleProduct = ".title";
  errorMessage = ".error-message-container";

  inputUsername(username) {
    cy.get(this.fieldUsername).should("be.visible").type(username);
  }

  inputPassword(password) {
    cy.get(this.fieldPassword).should("be.visible").type(password);
  }

  clickLoginBtn() {
    cy.get(this.loginBtn).should("be.visible").click();
  }

  assertErrorMessage(msg) {
    cy.get(this.errorMessage).should("have.text", msg);
  }

  assertSuccessLoginURL() {
    cy.url().should("include", "/inventory.html");
  }

  assertNavigateToLoginPage(){
    cy.url().should("eq", Cypress.env("links").live);
  }

  assertAppLogo() {
    cy.get(this.appLogo).should("have.text", "Swag Labs").and("be.visible");
  }

  assertProductsText() {
    cy.get(this.titleProduct).should("have.text", "Products").and("be.visible");
  }
}

module.exports = new LoginPage();
