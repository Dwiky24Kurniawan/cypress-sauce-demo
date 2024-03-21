export let CheckoutPage = {
    AssertCheckoutStepOneURL: () =>
    cy.url().should("include", "/checkout-step-one.html"),

    AssertCheckoutInformationHeaderText: () =>
    cy.get(".title").should("have.text", "Checkout: Your Information").and("be.visible"),

    getTextFieldFirstName: () => cy.get("#first-name").should("be.visible"),

    getTextFieldLastName: () => cy.get("#last-name").should("be.visible"),

    getTextFieldPostalCode: () => cy.get("#postal-code").should("be.visible"),

    getButtonContinue: () => cy.get("#continue").should("be.visible"),

    AssertCheckoutWithInvalidData: () =>
    cy.get(".error-message-container").should("be.visible"),

    AssertCheckoutStepTwoURL: () =>
    cy.url().should("include", "/checkout-step-two.html"),

    AssertCheckoutOverviewHeaderText: () =>
    cy.get(".title").should("have.text", "Checkout: Overview").and("be.visible"),

    getCheckoutOverviewItems: () => cy.get(".cart_item").should("be.visible"),

    getOverviewItemPrice: () => cy.get(".inventory_item_price").should("be.visible"),

    getPriceTotal: () => cy.get(".summary_subtotal_label").should("be.visible"),

    getButtonFinish: () => cy.get("#finish").should("be.visible"),

    AssertCheckoutComplete: () =>
    cy.url().should("include", "/checkout-complete.html"),

    AssertCheckoutCompleteHeaderText: () =>
    cy.get(".title").should("have.text", "Checkout: Complete!").and("be.visible"),

    AssertThankYouForYourOrder: () => cy.get(".complete-header").should("have.text", "Thank you for your order!").and("be.visible"),
}