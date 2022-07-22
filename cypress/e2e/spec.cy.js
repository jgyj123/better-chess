describe("end-end test", () => {
  it("passes", () => {
    cy.viewport(1280, 800);
    cy.visit("localhost:3000");

    cy.get("#email").should("exist");
    cy.get("#password").should("exist");
    cy.get("#login").should("exist");
    cy.get("#sign-up").click();
    cy.get("#firstName").type("John");
    cy.get("#lastName").type("Doe");
    cy.get("#email").type("test2@email.com");
    cy.get("#password").type("testing");
    cy.get("#sign-up-button").click();

    cy.get("#email").type("test2@email.com");
    cy.get("#password").type("testing");
    cy.get("#login").click();
    cy.get("#email").should("exist");
    cy.contains("John Doe");
    cy.contains("Rating");
    cy.contains("Coins");
    cy.contains("Wins");
    cy.contains("Losses");
    cy.get("#Message").should("exist");
    cy.get("#postMessage").should("exist");
    cy.get("#create-game").should("exist");
    cy.get("#message").type(
      "I am new to this site, thank you for inviting me over"
    );
    cy.get("#postMessage").click();
    cy.get("#message").type("This is an end-end test");
    cy.get("#postMessage").click();
    cy.get("#create-game").click();
    cy.get("#test-button").click();
    cy.get("#chat").click();
    cy.get("#messageBox").type("Hello! Nice to meet you");
    cy.get("#messageBox").type("{enter}");
    cy.get("#messageBox").type("Lets have a great game!");
    cy.get("#messageBox").type("{enter}");
    cy.get("#messageBox").type("I love playing chess");
    cy.get("#messageBox").type("{enter}");
    cy.get("#shopId").click();
    cy.get("#shop").click();
    cy.get("#0").click();
    cy.get("#testpurchase").click({ force: true });
    cy.get("#1").click();
    cy.get("#testpurchase").click({ force: true });
    cy.get("#home").click();
    cy.get("#return").click();
    cy.get("#items").click();
    cy.get("#0").click();
    cy.get("#1").click();
    cy.get("#0").click();
  });
});
