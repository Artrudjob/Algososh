import * as cypress from "cypress";

describe('Routers Is Available', () => {
  it("Should be available on localhost:3000/recursion", () => {
    cy.visit("http://localhost:3000/recursion");
  })

  it("Should be available on localhost:3000/fibonacci", () => {
    cy.visit("http://localhost:3000/fibonacci");
  })

  it("Should be available on localhost:3000/sorting", () => {
    cy.visit("http://localhost:3000/sorting");
  })

  it("Should be available on localhost:3000/stack", () => {
    cy.visit("http://localhost:3000/stack");
  })

  it("Should be available on localhost:3000/queue", () => {
    cy.visit("http://localhost:3000/queue");
  })

  it("Should be available on localhost:3000/list", () => {
    cy.visit("http://localhost:3000/list");
  })
})