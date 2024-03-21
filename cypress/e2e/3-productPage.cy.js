import { ProductsPage } from "../pageobjects";

beforeEach(() => {
  cy.login("live", "standard_user");
});

describe("Test Suite - Sauce Demo - Feature : Products Page", () => {
  it("TC001 - Positive - Products items must be visible", () => {
    ProductsPage.getInventoryItems().its("length").should("be.greaterThan", 1);
    ProductsPage.getInventoryItems().each(($el) => {
      cy.wrap($el).find('.inventory_item_name')
      .invoke("text")
      .its("length")
      .should("be.greaterThan", 1);

      cy.wrap($el).find('.inventory_item_desc')
      .invoke("text")
      .its("length")
      .should("be.greaterThan", 1);

      cy.wrap($el).find('.inventory_item_price')
      .invoke("text")
      .its("length")
      .should("be.greaterThan", 1);

      cy.wrap($el).find('button[id*=add-to-cart]')
      .invoke('text')
      .should("be.oneOf", ["Add to cart", "Remove"]);
    })
  });

  it("TC002 - Positive - Filter by name", () => {
    let productNames = [];
    ProductsPage.getInventoryItems()
      .find(".inventory_item_name")
      .each(($el) => {
        cy.wrap($el).invoke("text").as("product_name");
        cy.get("@product_name").then((product_name) => {
          productNames.push(product_name);
        });
      });

    ProductsPage.getFilterButton().select("Name (Z to A)");

    ProductsPage.getInventoryItems()
      .find(".inventory_item_name")
      .each(($el, index) => {
        cy.wrap($el).should(
          "have.text",
          productNames[productNames.length - index - 1]
        );
      });
  });
});