import * as cypress from "cypress";

describe("Fibonacci Work Is Correct", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/fibonacci");
    })

    it("The button is disabled when the input is empty", () => {
      cy.get('[data-cy="input"]').should("be.empty");

      cy.get('[data-cy="button"]').should("be.disabled");
    })

    it("Numbers are generated correctly", () => {
        cy.get('[data-cy="input"]').type("5").should("have.value", 5);

        cy.get('[data-cy="button"]').click();

        cy.get('[data-cy="circle"]').should("have.text", "1");

        cy.wait(1000);

        cy.get('[data-cy="circle"]').each((item, index) => {
            switch (index) {
                case 0:
                    cy.wrap(item).should("have.text", "1");
                    break;
                case 1:
                    cy.wrap(item).should("have.text", "1");
                    break;
            }
        });

        cy.wait(1000);

        cy.get('[data-cy="circle"]').each((item, index) => {
            switch (index) {
                case 0:
                    cy.wrap(item).should("have.text", "1");
                    break;
                case 1:
                    cy.wrap(item).should("have.text", "1");
                    break;
                case 2:
                    cy.wrap(item).should("have.text", "2");
                    break;
            }
        });

        cy.wait(1000);

        cy.get('[data-cy="circle"]').each((item, index) => {
            switch (index) {
                case 0:
                    cy.wrap(item).should("have.text", "1");
                    break;
                case 1:
                    cy.wrap(item).should("have.text", "1");
                    break;
                case 2:
                    cy.wrap(item).should("have.text", "2");
                    break;
                case 3:
                    cy.wrap(item).should("have.text", "3");
                    break;
            }
        });

        cy.wait(1000);

        cy.get('[data-cy="circle"]').each((item, index) => {
            switch (index) {
                case 0:
                    cy.wrap(item).should("have.text", "1");
                    break;
                case 1:
                    cy.wrap(item).should("have.text", "1");
                    break;
                case 2:
                    cy.wrap(item).should("have.text", "2");
                    break;
                case 3:
                    cy.wrap(item).should("have.text", "3");
                    break;
                case 4:
                    cy.wrap(item).should("have.text", "5");
                    break;
            }
        });

        cy.wait(1000);

        cy.get('[data-cy="circle"]').each((item, index) => {
            switch (index) {
                case 0:
                    cy.wrap(item).should("have.text", "1");
                    break;
                case 1:
                    cy.wrap(item).should("have.text", "1");
                    break;
                case 2:
                    cy.wrap(item).should("have.text", "2");
                    break;
                case 3:
                    cy.wrap(item).should("have.text", "3");
                    break;
                case 4:
                    cy.wrap(item).should("have.text", "5");
                    break;
                case 5:
                    cy.wrap(item).should("have.text", "8");
                    break;
            }
        });
    })
})