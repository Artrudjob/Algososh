import React, {useState, useEffect} from "react";
import styles from "./stack.module.css";
import {ElementStates} from "../../types/element-states";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Stack} from "./stack";
import {Circle} from "../ui/circle/circle";
import {v4} from "uuid";
import {timeout} from "../../utils/utils";

type TResultChar = {
    char: string;
    state: ElementStates;
    head: string;
    index: number
}

let resultChar: TResultChar[] = [];

export const StackPage: React.FC = () => {
    const [stack, setStack] = useState(new Stack());
    const [elements, setElements] = useState<JSX.Element[]>([]);
    const [value, setValue] = useState<string>("");
    const [disabledBtn, setDisabledBtn] = useState<string>("disableOff");
    const [loaderBtnAdd, setLoaderBtnAdd] = useState<boolean>(false);
    const [loaderBtnDel, setLoaderBtnDel] = useState<boolean>(false);
    const [loaderBtnClear, setLoaderBtnClear] = useState<boolean>(false);

    let circleElements: JSX.Element[];

    useEffect(() => {
        return () => {
            resultChar.length = 0;
        }

    }, [])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function updateCircleElement(array: TResultChar[]) {
        circleElements = array.map(item => {
            return (
                <Circle index={item.index} head={item.head} letter={item.char} state={item.state} key={v4()}/>
            )
        })
        setElements(circleElements);
    }

    async function addItem(item: string) {
        stack.push(item);
        const itemsArray = stack.element();
        const arraySize = stack.size();

        setLoaderBtnAdd(true);
        setDisabledBtn("disableOn");

        if (arraySize <= 1) {
            itemsArray.forEach((el, index) => {
                resultChar.push({
                    char: String(el),
                    state: ElementStates.Changing,
                    head: "top",
                    index: index
                })
            });
            updateCircleElement(resultChar);

            await timeout(500);

            resultChar[arraySize - 1].state = ElementStates.Default;
            updateCircleElement(resultChar);
            setValue("");
        } else {
            resultChar.length = 0;
            itemsArray.forEach((el, index) => {
                resultChar.push({
                    char: String(el),
                    state: ElementStates.Default,
                    head: "",
                    index: index
                })
            });
            resultChar[arraySize - 1].state = ElementStates.Changing;
            resultChar[arraySize - 1].head = "top";
            updateCircleElement(resultChar);

            await timeout(500);

            resultChar[arraySize - 1].state = ElementStates.Default;
            updateCircleElement(resultChar);
            setValue("");
        }
        setLoaderBtnAdd(false);
        setDisabledBtn("disableOff");
    }

    async function delItem() {
        const arraySize = stack.size();

        if (arraySize === 0) {
            throw new Error("Стэк уже пуст");
        }

        setLoaderBtnDel(true);
        setDisabledBtn("disableOn");

        if (arraySize === 1) {
            resultChar.length = 0;
            stack.element().forEach((el, index) => {
                resultChar.push({
                    char: String(el),
                    state: ElementStates.Changing,
                    head: "top",
                    index: index
                })
            });
            updateCircleElement(resultChar);

            await timeout(500);

            stack.pop();
            resultChar.length = 0;
            updateCircleElement(resultChar);
        } else {
            resultChar[arraySize - 1].state = ElementStates.Changing;
            updateCircleElement(resultChar);

            await timeout(500);

            stack.pop();

            const itemsArray = stack.element();

            resultChar.length = 0;
            itemsArray.forEach((el, index) => {
                resultChar.push({
                    char: String(el),
                    state: ElementStates.Default,
                    head: "",
                    index: index
                })
            });
            resultChar[arraySize - 2].head = "top";
            updateCircleElement(resultChar);
        }

        setLoaderBtnDel(false);
        setDisabledBtn("disableOff");
    }

    function clearArray() {
        stack.clear();
        resultChar.length = 0;
        updateCircleElement([]);
    }

    return (
        <SolutionLayout title="Стек">
            <div className={styles.stack}>
                <div className={styles.stack__flexBox}>
                    <div className={styles.stack__inputBox}>
                        <Input placeholder={"Введите текст"} value={value} maxLength={4} isLimitText={true}
                               onChange={handleChange}/>
                    </div>
                    <Button type={"button"} text={"Добавить"} linkedList={"small"}
                            disabled={value.length === 0 || disabledBtn === "disableOn"}
                            isLoader={loaderBtnAdd}
                            onClick={() => addItem(value)}/>
                    <Button type={"button"} text={"Удалить"} linkedList={"small"}
                            disabled={stack.size() === 0 || disabledBtn === "disableOn"}
                            isLoader={loaderBtnDel}
                            onClick={() => delItem()}/>
                </div>
                <Button type={"button"} text={"Очистить"} linkedList={"small"}
                        disabled={stack.size() === 0 || disabledBtn === "disableOn"}
                        isLoader={loaderBtnClear}
                        onClick={() => clearArray()}/>
            </div>
            <div className={styles.stack__itemsBox}>
                {elements}
            </div>
        </SolutionLayout>
    )
}