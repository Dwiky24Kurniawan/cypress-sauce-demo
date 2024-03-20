import { LoginPage } from "../pageobjects";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add(
  "login",
  (requiredEnv, requiredUser) => {
    const links = Cypress.env("links");
    const link = links[requiredEnv];
    cy.visit(link);
    const users = Cypress.env("users");
    const user = users[requiredUser];
    const username = user.username;
    const password = user.password;

    LoginPage.getTextboxUsername().clear().type(username);
    LoginPage.getTextboxPassbord().clear().type(password);
    LoginPage.getButtonLogin().click();
    LoginPage.AssertSuccessLoginURL();
    LoginPage.AssertAppLogo();
    LoginPage.AssertProductsText();
  },
  {
    cacheAcrossSpecs: true,
  }
);
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add("getSessionStorage", (key) => {
//   cy.window().then((window) => window.sessionStorage.getItem(key));
// });

// Cypress.Commands.add("setSessionStorage", (key, value) => {
//   cy.window().then((window) => {
//     window.sessionStorage.setItem(key, value);
//   });
// });
