import { ProductsPage, CartPage, CheckoutPage } from "../pageobjects";
import { validData, invalidData } from "../fixtures/checkoutInformation.json";

beforeEach(() => {
  cy.login("live", "standard_user");
});

describe("Test Suite - Sauce Demo - Feature : Add To Cart ", () => {
  it("TC001 - Positive - Add To Cart", () => {
    let inCart = 0;
    ProductsPage.getInventoryItems()
      .each(($el, index, $list) => {
        if (index % 2 == 0) {
          cy.wrap($el).find(".btn_primary").as("btnAddToCart").click();
          inCart++;
        }
      })
      .then(() => {
        ProductsPage.getShoppingCartBadge().should("have.text", "" + inCart);
      });
  });

  it("TC002 - Positive - E2E Checkout with valid data information", () => {
    let inCart = 0;
    ProductsPage.getInventoryItems()
      .each(($el, index, $list) => {
        if (index % 2 == 0) {
          cy.wrap($el).find(".btn_primary").as("btnAddToCart").click();
          inCart++;
        }
      })
      .then(() => {
        ProductsPage.getShoppingCartBadge().should("have.text", "" + inCart);
      });

    ProductsPage.getShoppingCartButton().click();
    CartPage.AssertCartURL();
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

    CartPage.getButtonCheckOut().click();
    CheckoutPage.AssertCheckoutStepOneURL();
    CheckoutPage.AssertCheckoutInformationHeaderText();

    validData.forEach((element) => {
      CheckoutPage.getTextFieldFirstName().clear().type(element.firstname);
      CheckoutPage.getTextFieldLastName().clear().type(element.lastname);
      CheckoutPage.getTextFieldPostalCode().clear().type(element.postalcode);
      CheckoutPage.getButtonContinue().click();
    });

    CheckoutPage.AssertCheckoutStepTwoURL();
    CheckoutPage.AssertCheckoutOverviewHeaderText();
    CheckoutPage.getCheckoutOverviewItems().first().as("checkoutOverviewItems");
    cy.get("@checkoutOverviewItems")
      .find(".inventory_item_name")
      .invoke("text")
      .its("length")
      .should("be.gt", 1);

    cy.get("@checkoutOverviewItems")
      .find(".inventory_item_desc")
      .invoke("text")
      .its("length")
      .should("be.gt", 1);

    cy.get("@checkoutOverviewItems")
      .find(".inventory_item_price")
      .invoke("text")
      .its("length")
      .should("be.gt", 1);

    CheckoutPage.getCheckoutOverviewItems()
      .find(".inventory_item_price")
      .then(($el) => {
        const price = $el
          .toArray()
          .map((el) => el.innerText)
          .map((s) => s.replace("$", ""))
          .map(parseFloat);
        const sumPrice = Cypress._.sum(price);

        CheckoutPage.getPriceTotal()
          .invoke("text")
          .invoke("split", " ")
          .invoke("find", (s) => s.startsWith("$"))
          .then((s) => s.replace("$", ""))
          .then(parseFloat)
          .should("equal", sumPrice);
      });

    CheckoutPage.getButtonFinish().click();
    CheckoutPage.AssertCheckoutComplete();
    CheckoutPage.AssertCheckoutCompleteHeaderText();
    CheckoutPage.AssertThankYouForYourOrder();
  });

  invalidData.forEach((element) => {
    it("TC003 - Negative - Checkout with " + element.test_case, () => {
      let inCart = 0;
      ProductsPage.getInventoryItems()
        .each(($el, index, $list) => {
          if (index % 2 == 0) {
            cy.wrap($el).find(".btn_primary").as("btnAddToCart").click();
            inCart++;
          }
        })
        .then(() => {
          ProductsPage.getShoppingCartBadge().should("have.text", "" + inCart);
        });

      ProductsPage.getShoppingCartButton().click();
      CartPage.AssertCartURL();
      CartPage.getCartListItems().its("length").should("be.greaterThan", 1);
      CartPage.getCartListItems().each(($el) => {
        cy.wrap($el)
        .find(".inventory_item_name")
        .invoke("text")
        .its("length")
        .should("be.gt", 1);

        cy.wrap($el)
        .find(".inventory_item_desc")
        .invoke("text")
        .its("length")
        .should("be.gt", 1);

        cy.wrap($el)
        .find(".inventory_item_price")
        .invoke("text")
        .its("length")
        .should("be.gt", 1);
      })

      CartPage.getButtonCheckOut().click();
      CheckoutPage.AssertCheckoutStepOneURL();
      CheckoutPage.AssertCheckoutInformationHeaderText();
      if (element.firstname != "")
        CheckoutPage.getTextFieldFirstName().clear().type(element.firstname);
      if (element.lastname != "")
        CheckoutPage.getTextFieldLastName().clear().type(element.lastname);
      if (element.postalcode != "")
        CheckoutPage.getTextFieldPostalCode().clear().type(element.postalcode);
      CheckoutPage.getButtonContinue().click();
      CheckoutPage.AssertCheckoutWithInvalidData().should(
        "have.text",
        element.message
      );
    });
  });
});