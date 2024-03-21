export let CartPage = {
    getCartListItems: () => cy.get(".cart_item").should("be.visible"),

    getButtonCheckOut: () => cy.get("#checkout").should("be.visible"),

    AssertCartURL: () =>
    cy.url().should("include", "/cart.html"),
}