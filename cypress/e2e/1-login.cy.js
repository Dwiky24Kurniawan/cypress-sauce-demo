import data from "../fixtures/login.json";
import loginPage from "../pageobjects/loginPage";

describe("Test Suite - Sauce Demo - Feature : Login", () => {
  
  it("TC001 - Positive - Login with valid data", () => {
    cy.login("live", "standard_user");
  });

  data.forEach((element, index) => {
    const testNumber = index + 2; // Mulai dari TC002, jadi tambahkan 2
    const testCaseNumber = "TC00" + testNumber;
    it(testCaseNumber + " - Negative - " + element.test_case, () => {
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