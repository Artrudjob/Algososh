import * as cypress from "cypress";
import {wait} from "@testing-library/user-event/dist/utils";

describe("Stack Work Is Correct", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/stack");
    })

    it("The add button is disabled when the input is empty", () => {
        cy.get('[data-cy="input"]').should("be.empty");

        cy.get('[data-cy="addBtn"]').should("be.disabled");
    })

    it("Correct of adding an element to the stack", () => {
        cy.get('[data-cy="input"]').type("A").should("have.value", "A");

        cy.get('[data-cy="addBtn"]').click();

        cy.get('[data-cy="circle"]').should("have.text", "A");
        cy.get('[data-cy="circle"]').should("have.css", "border-color", "rgb(210, 82, 225)");

        wait(500);

        cy.get('[data-cy="circle"]').should("have.css", "border-color", "rgb(0, 50, 255)");
    });

    it("Correct removal of an element from the stack", () => {
        cy.get('[data-cy="input"]').type("A").should("have.value", "A");

        cy.get('[data-cy="addBtn"]').click();

        cy.get('[data-cy="delBtn"]').click();

        cy.get('[data-cy="circle"]').should("have.css", "border-color", "rgb(210, 82, 225)");

        wait(500);

        cy.get('[data-cy="circle"]').should("not.exist");
    });

    it("Correct clearing of all elements of the stack", () => {
        cy.get('[data-cy="input"]').type("A").should("have.value", "A");
        cy.get('[data-cy="addBtn"]').click();

        cy.wait(1000);

        cy.get('[data-cy="input"]').type("B").should("have.value", "B");
        cy.get('[data-cy="addBtn"]').click();

        cy.wait(1000);

        cy.get('[data-cy="input"]').type("C").should("have.value", "C");
        cy.get('[data-cy="addBtn"]').click();

        cy.get('[data-cy="circle"]').should("have.length", 3);

        cy.get('[data-cy="clearBtn"]').click();

        cy.get('[data-cy="circle"]').should("have.length", 0);
    })
})