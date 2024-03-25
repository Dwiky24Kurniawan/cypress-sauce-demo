class ProductPage {
  menuBtn = "#react-burger-menu-btn";
  logoutBtn = "#logout_sidebar_link";
  inventoryItems = ".inventory_item";
  inventoryItemName = ".inventory_item_name";
  inventoryItemDesc = ".inventory_item_desc";
  inventoryItemPrice = ".inventory_item_price";
  inventoryItemBtn = "button[id*=add-to-cart]";
  shoppingCartBadge = ".shopping_cart_badge";
  shoppingCartBtn = "#shopping_cart_container";
  filterBtn = "select[class='product_sort_container']";

  clickMenuBtn() {
    cy.get(this.menuBtn)
      .should("have.text", "Open Menu")
      .and("be.visible")
      .click();
  }

  clickLogoutBtn() {
    cy.get(this.logoutBtn)
      .should("have.text", "Logout")
      .and("be.visible")
      .click();
  }

  assertInventoryItemsVisible() {
    cy.get(this.inventoryItems)
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

    cy.get(this.inventoryItemBtn).each((text) => {
      expect(text).to.be.visible;
      expect(text.text()).to.be.oneOf(["Add to cart", "Remove"]);
    });
  }

  getInventoryItems() {
    cy.get(this.inventoryItems)
      .should("be.visible")
      .its("length")
      .should("be.greaterThan", 1);
  }

  clickInventoryItemName() {
    cy.get(this.inventoryItems).first().find(".inventory_item_name").click();
  }

  clickInventoryItemButtons() {
    cy.get(this.inventoryItems)
      .each(($el, index) => {
        if (index % 2 == 0) {
          cy.wrap($el).find(this.inventoryItemBtn).click();
        }
      });
  }

  countItemsInCart() {
    return new Cypress.Promise(resolve => {
      let inCart = 0;
      cy.get(this.inventoryItems)
        .each(($el, index) => {
          if (index % 2 == 0) {
            inCart++;
          }
        })
        .then(() => {
          resolve(inCart);
        });
    });
  }

  assertShoppingCartBadgeCount() {
    this.countItemsInCart().then(itemCount => {
      cy.get(this.shoppingCartBadge)
        .should("have.text", "" + itemCount)
        .and("be.visible");
    });
  }

  clickShoppingCartBtn() {
    cy.get(this.shoppingCartBtn).should("be.visible").click();
  }

  clickFilterBtn() {
    cy.get(this.filterBtn).should("be.visible").select("Name (Z to A)");
  }

  assertFilter() {
    let productNames = [];
    cy.get(this.inventoryItems).each(($el) => {
      cy.wrap($el).invoke("text").as("product_name");
      cy.get("@product_name").then((product_name) => {
        productNames.push(product_name);
      });
    });

    // Sort productNames in descending order
    productNames.sort((a, b) => b.localeCompare(a));

    cy.get(this.inventoryItems).each(($el, index) => {
      cy.wrap($el).should("have.text", productNames[index]);
    });
  }
}

module.exports = new ProductPage();
