import productPage from "../pageobjects/productPage";
import detailProductPage from "../pageobjects/detailProductPage";

beforeEach(() => {
  cy.login("live", "standard_user");
});

describe("Test Suite - Sauce Demo - Feature : Detail Product Page", () => {
  it("TC001 - Positive - Detail Product item must be visible", () => {
    productPage.clickInventoryItemName();
    detailProductPage.assertDetailInventoryURL();
    detailProductPage.assertDetailInventoryItemVisible();
  });
});
