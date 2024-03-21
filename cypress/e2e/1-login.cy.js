import data from "../fixtures/login.json";
import { LoginPage } from "../pageobjects";

describe("Test Suite - Sauce Demo - Feature : Login", () => {
  it("TC001 - Positive - Login with valid data", () => {
    cy.login("live", "standard_user");
  });

  data.forEach((element) => {
    it("TC002 - Negative - " + element.test_case, () => {
      // const links = Cypress.env("links").live;
      cy.visit(Cypress.env("links").live);
      if (element.username != "")
        LoginPage.getTextFieldUsername().clear().type(element.username);
      if (element.password != "")
        LoginPage.getTextFieldPassword().clear().type(element.password);
      LoginPage.getButtonLogin().click();
      LoginPage.AssertLoginWithInvalidData().should("have.text", element.message);
    });
  });
});