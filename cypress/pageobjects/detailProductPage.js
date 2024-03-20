export let DetailProductsPage = {
  AssertDetailInventoryURL: () =>
    cy.url().should("include", "/inventory-item.html"),

  getDetailInventoryImage: () => cy.get(".inventory_details_img").should("be.visible").and('have.attr', 'src'),

  getDetailInventoryName: () => cy.get(".inventory_details_name")
    .should("be.visible")
    .invoke("text")
    .its("length")
    .should("be.greaterThan", 1),

  getDetailInventoryDesc: () => cy.get(".inventory_details_desc")
    .should("be.visible")
    .invoke("text")
    .its("length")
    .should("be.greaterThan", 1),

  getDetailInventoryPrice: () => cy.get(".inventory_details_price")
    .should("be.visible")
    .invoke("text")
    .its("length")
    .should("be.greaterThan", 1),

  getButtonAddOrRemoveToCart: () =>
    cy.get("button[id*=add-to-cart]")
    .invoke('text')
    .should("be.oneOf", ["Add to cart", "Remove"])
};
