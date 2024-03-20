import { ProductsPage, CartPage } from "../pageobjects";

beforeEach(() => {
  cy.login("live", "standard_user");
});

describe("Test Suite - Sauce Demo - Feature : Add To Cart ", () => {
  it("TC001 - Positive - Add To Cart", () => {
    let inCart = 0;
    ProductsPage.getInventoryItems()
      .each(($el, index, $list) => {
        if (index % 2 == 0) {
          cy.wrap($el)
            .find(".btn_primary")
            .as('btnAddToCart')
            .click()
          inCart++;
        }
      })
      .then(() => {
        ProductsPage.getShoppingCartBadge().should("have.text", "" + inCart);
      });
  });

  it("TC002 - Positive - Check Out", () => {
    let inCart = 0;
    ProductsPage.getInventoryItems()
      .each(($el, index, $list) => {
        if (index % 2 == 0) {
          cy.wrap($el)
            .find(".btn_primary")
            .as('btnAddToCart')
            .click()
          inCart++;
        }
      })
      .then(() => {
        ProductsPage.getShoppingCartBadge().should("have.text", "" + inCart);
      });
        
    ProductsPage.getShoppingCartButton().click()
    CartPage.getCartListItems().first().as("cartListItems");

    cy.get("@cartListItems")
      .find(".inventory_item_name")
      .invoke("text")
      .its("length")
      .should("be.gt", 1);

    cy.get("@cartListItems")
      .find(".inventory_item_desc")
      .invoke("text")
      .its("length")
      .should("be.gt", 1);

    cy.get("@cartListItems")
      .find(".inventory_item_price")
      .invoke("text")
      .its("length")
      .should("be.gt", 1);
    
    CartPage.getButtonCheckOut().click()
  });
});
