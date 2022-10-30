import React from "react";
import {swap} from "../../utils/utils";


describe("TEST COMPONENT STRING", () => {
    test("Correctly reverse a string with an even number of characters", () => {
        const array = ["T", "E", "S", "T"];

        let start = 0;
        let end = array.length - 1;

        while (start < end) {
            swap(array, start, end);
            start++
            end--
        }

        expect(array).toEqual(["T", "S", "E", "T"]);
    })

    test("Correctly reverse a string with an odd number of characters", () => {
        const array = ["H", "E", "L", "L", "O"];

        let start = 0;
        let end = array.length - 1;

        while (start < end) {
            swap(array, start, end);
            start++
            end--
        }

        expect(array).toEqual(["O", "L", "L", "E", "H"]);
    })

    test("Correctly reverse with one character", () => {
        const array = ["A"];

        swap(array, 0, 0);
        expect(array).toEqual(["A"]);
    })

    test("Correctly reverse an empty string", () => {
        const array = [];

        swap(array, 0, 0);
        expect(array).toEqual([]);
    })
})