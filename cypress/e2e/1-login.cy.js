import data from "../fixtures/login.json";
import loginPage from "../pageobjects/LoginPage";

describe("Test Suite - Sauce Demo - Feature : Login", () => {
  
  it("TC001 - Positive - Login with valid data", () => {
    cy.login("live", "standard_user");
  });

  data.forEach((element) => {
    it("TC002 - Negative - " + element.test_case, () => {
      cy.visit(Cypress.env("links").live);
      if (element.username != "")
        loginPage.inputUsername(element.username);
      if (element.password != "")
        loginPage.inputPassword(element.password);
      loginPage.clickLoginBtn();
      loginPage.assertErrorMessage(element.message);
    });
  });
});