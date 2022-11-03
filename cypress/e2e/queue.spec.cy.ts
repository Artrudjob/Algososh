import * as cypress from "cypress";

describe("Queue Work Is Correct", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/queue")
    })

    it("The add button is disabled when the input is empty", () => {
        cy.get('[data-cy="input"]').should("be.empty");

        cy.get('[data-cy="addBtn"]').should("be.disabled");
    })

    it("Correct of adding an element to the queue", () => {
        cy.get('[data-cy="input"]').type("A").should("have.value", "A");

        cy.get('[data-cy="addBtn"]').click();

        cy.get('[data-cy="circle"]').each((item, index) => {
            if (index === 0) {
                cy.wrap(item).should("have.text", "A");
                cy.wrap(item).should("have.css", "border-color", "rgb(210, 82, 225)");
            }
        })

        cy.get('[data-cy="circleHead"]').each((item, index) => {
            if (index === 0) {
                cy.wrap(item).should("have.text", "head");
            }
        })

        cy.get('[data-cy="circleTail"]').each((item, index) => {
            if (index === 0) {
                cy.wrap(item).should("have.text", "tail");
            }
        })

        cy.wait(500);

        cy.get('[data-cy="circle"]').each((item, index) => {
            if (index === 0) {
                cy.wrap(item).should("have.text", "A");
                cy.wrap(item).should("have.css", "border-color", "rgb(0, 50, 255)");
            }
        })

        cy.get('[data-cy="input"]').type("B").should("have.value", "B");

        cy.get('[data-cy="addBtn"]').click();

        cy.get('[data-cy="circleHead"]').each((item, index) => {
            if (index === 0) {
                cy.wrap(item).should("have.text", "head");
            }
        });

        cy.get('[data-cy="circleTail"]').each((item, index) => {
            switch (index) {
                case 0:
                    cy.wrap(item).should("have.text", "");
                    break;
                case 1:
                    cy.wrap(item).should("have.text", "tail");
                    break;
            }
        });
    })

    it("Correct removal of an element from the queue",() => {
        cy.get('[data-cy="input"]').type("A").should("have.value", "A");

        cy.get('[data-cy="addBtn"]').click();

        cy.wait(500);

        cy.get('[data-cy="delBtn"]').click();

        cy.wait(500);

        cy.get('[data-cy="circle"]').each((item, index) => {
            if (index === 0) {
                cy.wrap(item).should("have.text", "");
            }
        })
    });

    it("Correct clearing of all elements of the queue", () => {
        cy.get('[data-cy="input"]').type("A").should("have.value", "A");

        cy.get('[data-cy="addBtn"]').click();

        cy.wait(500);

        cy.get('[data-cy="input"]').type("B").should("have.value", "B");

        cy.get('[data-cy="addBtn"]').click();

        cy.wait(500);

        cy.get('[data-cy="input"]').type("C").should("have.value", "C");

        cy.get('[data-cy="addBtn"]').click();

        cy.get('[data-cy="clearBtn"]').click();

        cy.get('[data-cy="circle"]').each((item) => {
            cy.wrap(item).should("have.text", "");
        })
    })
})