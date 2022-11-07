import React from "react";
import {create} from "react-test-renderer";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe("TEST CIRCLE", () => {
    test("Circle with not a letter", () => {
        const componentCircle = create(<Circle />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })

    test("Circle with a letter", () => {
        const componentCircle = create(<Circle letter={"test"} />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })

    test("Circle with head", () => {
        const componentCircle = create(<Circle head={"test"} />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })

    test("Circle with a JSX.element in the head", () => {
        const componentCircle = create(<Circle head={<Circle />} />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })

    test("Circle with tail", () => {
        const componentCircle = create(<Circle tail={"test"} />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })

    test("Circle with a JSX.element in the tail", () => {
        const componentCircle = create(<Circle tail={<Circle />} />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })

    test("Circle with index", () => {
        const componentCircle = create(<Circle index={0} />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })

    test("Circle with prop isSmall === true", () => {
        const componentCircle = create(<Circle isSmall={true} />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })

    test("Circle with state === ElementStates.Default", () => {
        const componentCircle = create(<Circle state={ElementStates.Default} />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })

    test("Circle with state === ElementStates.Changing", () => {
        const componentCircle = create(<Circle state={ElementStates.Changing} />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })

    test("Circle with state === ElementStates.Modified", () => {
        const componentCircle = create(<Circle state={ElementStates.Modified} />);
        expect(componentCircle.toJSON()).toMatchSnapshot();
    })
})