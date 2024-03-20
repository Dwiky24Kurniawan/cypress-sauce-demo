export let LoginPage = {
  getTextboxUsername: () => cy.get("#user-name").should("be.visible"),
  
  getTextboxPassbord: () => cy.get("#password").should("be.visible"),

  getButtonLogin: () => cy.get("#login-button").should("be.visible"),

  AssertSuccessLoginURL: () =>
    cy.url().should("include", "/inventory.html"),

  AssertAppLogo: () =>
    cy.get(".app_logo").should("have.text", "Swag Labs").should("be.visible"),

  AssertProductsText: () =>
    cy.get(".title").should("have.text", "Products").should("be.visible"),

  AssertLoginWithInvalidData: () =>
    cy.get(".error-message-container").should("be.visible"),
};
