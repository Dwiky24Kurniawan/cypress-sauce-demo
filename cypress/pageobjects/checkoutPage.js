class CheckoutPage {
  checkoutInformationHeaderText = ".title";
  fieldFirstName = "#first-name";
  fieldLastName = "#last-name";
  fieldPostalCode = "#postal-code";
  continueBtn = "#continue";
  errorMessage = ".error-message-container";
  checkoutOverviewHeaderText = ".title";
  checkoutOverviewItems = ".cart_item";
  inventoryItemName = ".inventory_item_name";
  inventoryItemDesc = ".inventory_item_desc";
  inventoryItemPrice = ".inventory_item_price";
  totalPrice = ".summary_subtotal_label";
  finishBtn = "#finish";
  checkoutComplete = ".title";
  thankYou = ".complete-header";

  assertCheckoutStepOneURL() {
    cy.url().should("include", "/checkout-step-one.html");
  }

  assertCheckoutInformationHeaderText() {
    cy.get(this.checkoutInformationHeaderText)
      .should("have.text", "Checkout: Your Information")
      .and("be.visible");
  }

  inputFirstname(firstname) {
    cy.get(this.fieldFirstName).should("be.visible").type(firstname);
  }

  inputLastname(lastname) {
    cy.get(this.fieldLastName).should("be.visible").type(lastname);
  }

  inputPostalCode(postalcode) {
    cy.get(this.fieldPostalCode).should("be.visible").type(postalcode);
  }

  clickContinueBtn() {
    cy.get(this.continueBtn).should("be.visible").click();
  }

  assertErrorMessage(msg) {
    cy.get(this.errorMessage).should("have.text", msg);
  }

  assertCheckoutStepTwoURL() {
    cy.url().should("include", "/checkout-step-two.html");
  }

  assertCheckoutOverviewHeaderText() {
    cy.get(this.checkoutOverviewHeaderText)
      .should("have.text", "Checkout: Overview")
      .and("be.visible");
  }

  assertCheckoutOverviewItems() {
    cy.get(this.checkoutOverviewItems)
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

  assertTotalPrice() {
    cy.get(this.inventoryItemPrice).then(($el) => {
      const price = $el
        .toArray()
        .map((el) => el.innerText)
        .map((s) => s.replace("$", ""))
        .map(parseFloat);
      const sumPrice = Cypress._.sum(price);

      cy.get(this.totalPrice)
        .should("be.visible")
        .invoke("text")
        .invoke("split", " ")
        .invoke("find", (s) => s.startsWith("$"))
        .then((s) => s.replace("$", ""))
        .then(parseFloat)
        .should("equal", sumPrice);
    });
  }

  clickFinishBtn() {
    cy.get(this.finishBtn).should("be.visible").click();
  }

  assertCheckoutCompleteURL() {
    cy.url().should("include", "/checkout-complete.html");
  }

  assertCheckoutComplete() {
    cy.get(this.checkoutComplete)
      .should("have.text", "Checkout: Complete!")
      .and("be.visible");
  }

  assertThankYouForYourOrder() {
    cy.get(this.thankYou)
      .should("have.text", "Thank you for your order!")
      .and("be.visible");
  }
}

module.exports = new CheckoutPage();
