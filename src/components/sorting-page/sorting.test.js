import React from "react";
import {swap} from "../../utils/utils";

describe("TESTING SELECTION AND BUBBLE SORT ALGORITHMS", () => {
    test("Selection sort correctly sorts the array", () => {
        const emptyArray = [];
        const arrayOneElement = [1];
        const array = [1, 3, 2, 9, 5, 4, 7];

        function selectionSort(arr) {
            if (arr.length === 0) {
                return arr;
            }

            for (let i = 0; i < arr.length; i++) {
                let indexMin = i;
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[j] < arr[indexMin]) {
                        indexMin = j;
                    }
                }
                swap(arr, i, indexMin)
            }
            return arr;
        }

        const resEmptyArray = selectionSort(emptyArray);
        const resArrElement = selectionSort(arrayOneElement);
        const resArray = selectionSort(array);

        expect(resEmptyArray).toEqual([]);
        expect(resArrElement).toEqual([1]);
        expect(resArray).toEqual([1, 2, 3, 4, 5, 7, 9]);
    })

    test("Bubble sort correctly sorts the array", () => {
        const emptyArray = [];
        const arrayOneElement = [1];
        const array = [1, 3, 2, 9, 5, 4, 7];

        function bubbleSort(arr) {
            if (arr.length === 0) {
                return arr;
            }

            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (array[j + 1] < array[j]) {
                        swap(arr, j, j + 1);
                    }
                }
            }
            return arr;
        }

        const resEmptyArray = bubbleSort(emptyArray);
        const resArrElement = bubbleSort(arrayOneElement);
        const resArray = bubbleSort(array);

        expect(resEmptyArray).toEqual([]);
        expect(resArrElement).toEqual([1]);
        expect(resArray).toEqual([1, 2, 3, 4, 5, 7, 9]);
    })
})