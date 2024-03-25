class CartPage {
  cartListItems = ".cart_item";
  checkoutBtn = "#checkout";
  inventoryItemName = ".inventory_item_name";
  inventoryItemDesc = ".inventory_item_desc";
  inventoryItemPrice = ".inventory_item_price";

  assertCartURL() {
    cy.url().should("include", "/cart.html");
  }

  assertCartListItems() {
    cy.get(this.cartListItems)
      .should("be.visible")
      .its("length")
      .should("be.greaterThan", 1);

    cy.get(this.inventoryItemName)
      .should("be.visible")
      .invoke("text")
      .its("length")
      .should("be.greaterThan", 1);

    cy.get(this.inventoryItemDesc)
      .should("be.visible")
      .invoke("text")
      .its("length")
      .should("be.greaterThan", 1);

    cy.get(this.inventoryItemPrice)
      .should("be.visible")
      .invoke("text")
      .its("length")
      .should("be.greaterThan", 1);
  }

  clickCheckoutBtn() {
    cy.get(this.checkoutBtn).should("be.visible").click();
  }
}

module.exports = new CartPage();
