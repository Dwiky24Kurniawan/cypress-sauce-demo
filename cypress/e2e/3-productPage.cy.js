import productPage from "../pageobjects/productPage";

beforeEach(() => {
  cy.login("live", "standard_user");
});

describe("Test Suite - Sauce Demo - Feature : Products Page", () => {
  it("TC001 - Positive - Products items must be visible", () => {
    productPage.assertInventoryItemsVisible();
  });

  it("TC002 - Positive - Filter by name", () => {
    productPage.clickFilterBtn();
    productPage.assertFilter();
  });
});
