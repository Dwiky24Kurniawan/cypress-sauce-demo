export let LoginPage = {
  getTextFieldUsername: () => cy.get("#user-name").should("be.visible"),
  
  getTextFieldPassword: () => cy.get("#password").should("be.visible"),

  getButtonLogin: () => cy.get("#login-button").should("be.visible"),

  AssertSuccessLoginURL: () =>
    cy.url().should("include", "/inventory.html"),

  AssertAppLogo: () =>
    cy.get(".app_logo").should("have.text", "Swag Labs").and("be.visible"),

  AssertProductsText: () =>
    cy.get(".title").should("have.text", "Products").and("be.visible"),

  AssertLoginWithInvalidData: () =>
    cy.get(".error-message-container").should("be.visible"),
};
