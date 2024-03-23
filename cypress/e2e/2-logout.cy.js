import productPage from "../pageobjects/productPage";

describe("Test Suite - Test Suite - Sauce Demo - Feature : Logout", () => {
  it("TC001 - Positive - Logout", () => {
    cy.login("live", "standard_user");
    productPage.clickMenuBtn();
    productPage.clickLogoutBtn();
    cy.url().should("eq", Cypress.env("links").live);
  });
});
