import { ProductsPage, DetailProductsPage } from "../pageobjects";

beforeEach(() => {
  // cy.setSessionStorage("cart-contents", "[]");
  cy.login("live", "standard_user");
});

describe("Test Suite - Sauce Demo - Feature : Detail Product Page", () => {
  it("TC001 - Positive - Detail Product item must be visible", () => {
    ProductsPage.getInventoryItems().first().as("inventoryItem");
    cy.get("@inventoryItem").find(".inventory_item_name").click();
    DetailProductsPage.AssertDetailInventoryURL();
    DetailProductsPage.getDetailInventoryImage();
    DetailProductsPage.getDetailInventoryName();
    DetailProductsPage.getDetailInventoryDesc();
    DetailProductsPage.getDetailInventoryPrice();
    DetailProductsPage.getButtonAddOrRemoveToCart();
  });
});
