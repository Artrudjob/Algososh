import * as cypress from "cypress";

describe("String Work Is Correct", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/recursion");
    })

    it("The button is disabled when the input is empty", () => {
        cy.get('[data-cy="input"]').should("be.empty");

        cy.get('[data-cy="button"]').should("be.disabled");
    })

    it("The string expands correctly", () => {
        cy.get('[data-cy="input"]').type("HELLO").should("have.value", "HELLO");

        cy.get('[data-cy="button"]').click();

        cy.get('[data-cy="circle"]').each((item, index) => {
            switch (index) {
                case 0:
                    cy.wrap(item).should("have.text", "H");
                    cy.wrap(item).should("have.css", "border-color", "rgb(210, 82, 225)");
                    break;
                case 1:
                    cy.wrap(item).should("have.text", "E");
                    cy.wrap(item).should("have.css", "border-color", "rgb(0, 50, 255)");
                    break;
                case 2:
                    cy.wrap(item).should("have.text", "L");
                    cy.wrap(item).should("have.css", "border-color", "rgb(0, 50, 255)");
                    break;
                case 3:
                    cy.wrap(item).should("have.text", "L");
                    cy.wrap(item).should("have.css", "border-color", "rgb(0, 50, 255)");
                    break;
                case 4:
                    cy.wrap(item).should("have.text", "O");
                    cy.wrap(item).should("have.css", "border-color", "rgb(210, 82, 225)");
                    break;
            }
        })

        cy.wait(2000);

        cy.get('[data-cy="circle"]').each((item, index) => {
            switch (index) {
                case 0:
                    cy.wrap(item).should("have.text", "O");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
                case 1:
                    cy.wrap(item).should("have.text", "E");
                    cy.wrap(item).should("have.css", "border-color", "rgb(210, 82, 225)");
                    break;
                case 2:
                    cy.wrap(item).should("have.text", "L");
                    cy.wrap(item).should("have.css", "border-color", "rgb(0, 50, 255)");
                    break;
                case 3:
                    cy.wrap(item).should("have.text", "L");
                    cy.wrap(item).should("have.css", "border-color", "rgb(210, 82, 225)");
                    break;
                case 4:
                    cy.wrap(item).should("have.text", "H");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
            }
        })

        cy.wait(2000);

        cy.get('[data-cy="circle"]').each((item, index) => {
            switch (index) {
                case 0:
                    cy.wrap(item).should("have.text", "O");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
                case 1:
                    cy.wrap(item).should("have.text", "L");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
                case 2:
                    cy.wrap(item).should("have.text", "L");
                    cy.wrap(item).should("have.css", "border-color", "rgb(210, 82, 225)");
                    break;
                case 3:
                    cy.wrap(item).should("have.text", "E");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
                case 4:
                    cy.wrap(item).should("have.text", "H");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
            }
        })

        cy.wait(2000);

        cy.get('[data-cy="circle"]').each((item, index) => {
            switch (index) {
                case 0:
                    cy.wrap(item).should("have.text", "O");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
                case 1:
                    cy.wrap(item).should("have.text", "L");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
                case 2:
                    cy.wrap(item).should("have.text", "L");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
                case 3:
                    cy.wrap(item).should("have.text", "E");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
                case 4:
                    cy.wrap(item).should("have.text", "H");
                    cy.wrap(item).should("have.css", "border-color", "rgb(127, 224, 81)");
                    break;
            }
        })
    })
})