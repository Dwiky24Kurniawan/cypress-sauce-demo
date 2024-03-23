class DetailProductPage {
  detailInventoryImage = ".inventory_details_img";
  detailInventoryName = ".inventory_details_name";
  detailInventoryDesc = ".inventory_details_desc";
  detailInventoryPrice = ".inventory_details_price";
  detailInnventoryBtn = "button[id*=add-to-cart]";

  assertDetailInventoryURL() {
    cy.url().should("include", "/inventory-item.html");
  }

  assertDetailInventoryItemVisible() {
    cy.get(this.detailInventoryImage)
      .should("be.visible")
      .and("have.attr", "src");

    cy.get(this.detailInventoryName)
      .should("be.visible")
      .invoke("text")
      .its("length")
      .should("be.greaterThan", 1);

    cy.get(this.detailInventoryDesc)
      .should("be.visible")
      .invoke("text")
      .its("length")
      .should("be.greaterThan", 1);

    cy.get(this.detailInventoryPrice)
      .should("be.visible")
      .invoke("text")
      .its("length")
      .should("be.greaterThan", 1);

    cy.get(this.detailInnventoryBtn).each((text) => {
      expect(text).to.be.visible;
      expect(text.text()).to.be.oneOf(["Add to cart", "Remove"]);
    });
  }
}

module.exports = new DetailProductPage();
