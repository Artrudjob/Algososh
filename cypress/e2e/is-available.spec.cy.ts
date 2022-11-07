import * as cypress from "cypress";

describe("Service Is Available", () => {
  it("Should be available on localhost:3000", () => {
    cy.visit("http://localhost:3000");
  })
})