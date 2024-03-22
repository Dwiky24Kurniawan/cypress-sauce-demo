class LoginPage{
    
    fieldUsername = "#user-name";
    fieldPassword = "#password";
    loginBtn = "#login-button";
    appLogo = ".app_logo";
    titleProduct = ".title";
    errorMessage = ".error-message-container";

    inputUsername(input){
      cy.get(this.fieldUsername).type(input);
    }

    inputPassword(input){
      cy.get(this.fieldPassword).type(input);
    }

    clickLoginBtn(){
      cy.get(this.loginBtn).click();
    }

    assertErrorMessage(msg){
      cy.get(this.errorMessage).should("have.text", msg)
    }

    assertSuccessLoginURL(){
      cy.url().should("include", "/inventory.html")
    }

    assertAppLogo(){
      cy.get(this.appLogo).should("have.text", "Swag Labs").and("be.visible")
    }

    assertProductsText(){
      cy.get(this.titleProduct).should("have.text", "Products").and("be.visible")
    }
}

module.exports = new LoginPage();
