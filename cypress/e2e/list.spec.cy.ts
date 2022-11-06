import * as cypress from "cypress";

describe("List Work Is Correct", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/list")
    })

    it("Add buttons and delete button by index - disabled if the input is empty.", () => {
        cy.get('[data-cy="input"]').should("be.empty");

        cy.get('[data-cy="indexInput"]').should("be.empty");

        cy.get('[data-cy="addHeadBtn"]').should("be.disabled");

        cy.get('[data-cy="addTailBtn"]').should("be.disabled");

        cy.get('[data-cy="addIndexBtn"]').should("be.disabled");

        cy.get('[data-cy="delIndexBtn"]').should("be.disabled");
    })

    it("Correctness of rendering the default list", () => {
        cy.get('[data-cy="circle"]').should("be.exist");

        cy.get('[data-cy="circleHead"]').each((item, index) => {
            if (index === 0) {
                cy.wrap(item).should("have.text", "head");
            } else {
                cy.wrap(item).should("have.text", "");
            }
        });

        cy.get('[data-cy="circleTail"]').each((item, index, $list) => {
            if (index === $list.length - 1) {
                cy.wrap(item).should("have.text", "tail")
            } else {
                cy.wrap(item).should("have.text", "");
            }
        });
    })

    it("Correctness of adding an element to head", () => {
        cy.get('[data-cy="input"]').type("A").should("have.value", "A");

        cy.get('[data-cy="addHeadBtn"]').click();

        cy.get('[data-cy="circle"]').eq(0).should("have.text", "A");
        cy.get('[data-cy="circle"]').eq(0).should("have.css",
            "border-color",
            "rgb(210, 82, 225)"
        );

        cy.wait(500);

        cy.get('[data-cy="circle"]').eq(0).should("have.css",
            "border-color",
            "rgb(127, 224, 81)"
        );

        cy.wait(500);

        cy.get('[data-cy="circle"]').eq(0).should("have.css",
            "border-color",
            "rgb(0, 50, 255)"
        );
    })

    it("Correctness of adding an element to tail", () => {
        cy.get('[data-cy="input"]').type("Z").should("have.value", "Z");

        cy.get('[data-cy="addTailBtn"]').click();

        cy.get('[data-cy="circle"]').last().should("have.text", "Z");
        cy.get('[data-cy="circle"]').last().should("have.css",
            "border-color",
            "rgb(210, 82, 225)"
        );

        cy.wait(500);

        cy.get('[data-cy="circle"]').last().should("have.css",
            "border-color",
            "rgb(127, 224, 81)"
        );

        cy.wait(500);

        cy.get('[data-cy="circle"]').last().should("have.css",
            "border-color",
            "rgb(0, 50, 255)"
        );
    })

    it("Correctness of adding an element by index", () => {
        cy.get('[data-cy="input"]').type("C").should("have.value", "C");

        cy.get('[data-cy="indexInput"]').type("2").should("have.value", "2");

        cy.get('[data-cy="addIndexBtn"]').click();

        cy.wait(1000);

        cy.get('[data-cy="circle"]').each((item, index) => {
            if (index === 2) {
                cy.wrap(item).should("have.text", "C");
            }
        })
    })

    it("Correctness of deleting an element from head", () => {
        cy.get('[data-cy="circle"]').eq(0).should("have.text", "85");

        cy.get('[data-cy="circle"]').should("have.length", 4);

        cy.get('[data-cy="delHeadBtn"]').click();

        cy.wait(500);

        cy.get('[data-cy="circle"]').eq(0).should("have.text", "13");

        cy.get('[data-cy="circle"]').should("have.length", 3);
    })

    it("Correctness of deleting an element from tail", () => {
        cy.get('[data-cy="circle"]').last().should("have.text", "1");

        cy.get('[data-cy="circle"]').should("have.length", 4)

        cy.get('[data-cy="delTailBtn"]').click();

        cy.wait(500);

        cy.get('[data-cy="circle"]').last().should("have.text", "34");

        cy.get('[data-cy="circle"]').should("have.length", 3);
    })

    it("Correctness of deleting an element by index", () => {
        cy.get('[data-cy="indexInput"]').type("2").should("have.value", "2");

        cy.get('[data-cy="circle"]').eq(2).should("have.text", "34");

        cy.get('[data-cy="circle"]').should("have.length", 4);

        cy.get('[data-cy="delIndexBtn"]').click();

        cy.wait(2000);

        cy.get('[data-cy="circle"]').eq(2).should("have.text", "1");

        cy.get('[data-cy="circle"]').should("have.length", 3);
    })
})