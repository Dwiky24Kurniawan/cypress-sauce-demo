import productPage from "../pageobjects/productPage";
import cartPage from "../pageobjects/cartPage";
import checkoutPage from "../pageobjects/checkoutPage";
import { validData, invalidData } from "../fixtures/checkoutInformation.json";

beforeEach(() => {
  cy.login("live", "standard_user");
});

describe("Test Suite - Sauce Demo - Feature : Add To Cart ", () => {
  it("TC001 - Positive - Add To Cart", () => {
    productPage.addSomeItemsToCart();
  });

  it("TC002 - Positive - E2E Checkout with valid data information", () => {
    productPage.addSomeItemsToCart();
    productPage.clickShoppingCartBtn();
    cartPage.assertCartURL();
    cartPage.assertCartListItems();
    cartPage.clickCheckoutBtn();
    checkoutPage.assertCheckoutStepOneURL();
    checkoutPage.assertCheckoutInformationHeaderText();
    validData.forEach((element) => {
      checkoutPage.inputFirstname(element.firstname);
      checkoutPage.inputLastname(element.lastname);
      checkoutPage.inputPostalCode(element.postalcode);
      checkoutPage.clickContinueBtn();
    });
    checkoutPage.assertCheckoutStepTwoURL();
    checkoutPage.assertCheckoutOverviewHeaderText();
    checkoutPage.assertCheckoutOverviewItems();
    checkoutPage.assertTotalPrice();
    checkoutPage.clickFinishBtn();
    checkoutPage.assertCheckoutCompleteURL();
    checkoutPage.assertCheckoutComplete();
    checkoutPage.assertThankYouForYourOrder();
  });

  invalidData.forEach((element) => {
    it("TC002 - Negative - Checkout with " + element.test_case, () => {
      productPage.addSomeItemsToCart();
      productPage.clickShoppingCartBtn();
      cartPage.assertCartURL();
      cartPage.assertCartListItems();
      cartPage.clickCheckoutBtn();
      checkoutPage.assertCheckoutStepOneURL();
      checkoutPage.assertCheckoutInformationHeaderText();
      if (element.firstname != "")
        checkoutPage.inputFirstname(element.firstname);
      if (element.lastname != "") checkoutPage.inputLastname(element.lastname);
      if (element.postalcode != "")
        checkoutPage.inputPostalCode(element.postalcode);
      checkoutPage.clickContinueBtn();
      checkoutPage.assertErrorMessage(element.message);
    });
  });
});
