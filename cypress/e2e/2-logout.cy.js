import { LoginPage, ProductsPage } from "../pageobjects";

describe("Test Suite - Test Suite - Sauce Demo - Feature : Logout", () => {
  it("TC001 - Positive - Logout", () => {
    cy.login("live", "standard_user");
    ProductsPage.getButtonMenu().click();
    ProductsPage.getButtonLogOut().click();
    cy.url().should("eq", Cypress.env("links").live)
  });
});