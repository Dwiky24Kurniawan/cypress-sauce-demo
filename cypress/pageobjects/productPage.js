export let ProductsPage = {
  getButtonMenu: () =>
    cy
      .get("#react-burger-menu-btn")
      .should("have.text", "Open Menu")
      .should("be.visible"),

  getButtonLogOut: () =>
    cy
      .get("#logout_sidebar_link")
      .should("have.text", "Logout")
      .should("be.visible"),

  getInventoryItems: () => cy.get(".inventory_item").should("be.visible"),

  addProductToTheCart: (position) => cy.get('.btn_inventory').eq(position).click(),

  getShoppingCartBadge: () => cy.get(".shopping_cart_badge").should("be.visible"),

  getShoppingCartButton: () => cy.get("#shopping_cart_container").should("be.visible"),

  getFilterButton: () =>
    cy.get(".product_sort_container").should("have.value", "az"),
};
