import React from "react";
import {create} from "react-test-renderer";
import {render, fireEvent, screen} from "@testing-library/react";
import {Button} from "./button";

describe("TEST BUTTON", () => {
    test("Button with text", () => {
        const componentButton = create(<Button text={"text"} />);
        expect(componentButton.toJSON()).toMatchSnapshot();
    })

    test("Button with not text", () => {
        const componentButton = create(<Button />);
        expect(componentButton.toJSON()).toMatchSnapshot();
    })

    test("Button disabled", () => {
        const componentButton = create(<Button disabled={true} />);
        expect(componentButton.toJSON()).toMatchSnapshot();
    })

    test("Button in loading state", () => {
        const componentButton = create(<Button isLoader={true} />);
        expect(componentButton.toJSON()).toMatchSnapshot();
    })

    test("Calling a callback when the button is clicked.", () => {
        render(<Button />);
        fireEvent.click(screen.getByRole("button"));
    })
})
