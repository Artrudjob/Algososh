import React, {useEffect, useState, useMemo} from "react";
import styles from "./queue.module.css";
import {Queue} from "./queue";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {v4} from "uuid";
import {timeout} from "../../utils/utils";

type TResultChar = {
    char: string;
    state: ElementStates;
    head: string;
    tail: string;
    index: number
}

let resultChar: TResultChar[] = [];
let stepAdd = 0;
let stepRemove = 0;

export const QueuePage: React.FC = () => {

    const queue = useMemo(() => new Queue(), []);
    const [elements, setElements] = useState<JSX.Element[]>([]);
    const [value, setValue] = useState<string>("");
    const [disabledBtn, setDisabledBtn] = useState<string>("disableOff");
    const [loaderBtnAdd, setLoaderBtnAdd] = useState<boolean>(false);
    const [loaderBtnDel, setLoaderBtnDel] = useState<boolean>(false);

    let circleElements: JSX.Element[];

    // TODO: хук useEffect должен срабатывать только при монтировании и размантировании страницы
    useEffect(() => {
        createItemsArr();

        return () => {
            resultChar.length = 0;
            stepAdd = 0;
            stepRemove = 0;
        }
    }, []); // eslint-disable-line

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function createItemsArr() {
        let i = 0
        while (i <= 6) {
            resultChar.push({char: "", state: ElementStates.Default, head: "", tail: "", index: i});
            circleElements = resultChar.map(item => {
                return (
                    <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail} state={item.state}
                            key={v4()}/>
                )
            })
            i++
        }
        setElements(circleElements);
    }

    function updateCircleElement(
        elIndex: number,
        letter: string,
        elStates: ElementStates,
        top: string,
        bottom: string) {
        resultChar[elIndex].char = letter;
        resultChar[elIndex].state = elStates;
        resultChar[elIndex].head = top;
        resultChar[elIndex].tail = bottom;
        circleElements = resultChar.map((item => {
            return (
                <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail}
                        state={item.state} key={v4()}/>
            )
        }))
        setElements(circleElements);
    }

    async function enqueue(item: string) {
        if (stepAdd <= 6) {
            setLoaderBtnAdd(true);
            setDisabledBtn("disableOn");
            if (stepAdd === 0) {
                queue.enqueue(item);
                updateCircleElement(stepAdd, item, ElementStates.Changing, "head", "tail");
            } else {
                queue.enqueue(item);
                resultChar[stepAdd - 1].tail = "";
                updateCircleElement(stepAdd, item, ElementStates.Changing, "", "tail");
            }

            await timeout(500);
            resultChar[stepAdd].state = ElementStates.Default;
            circleElements = resultChar.map((item => {
                return (
                    <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail} state={item.state}
                            key={v4()}/>
                )
            }));
            setElements(circleElements);
            setLoaderBtnAdd(false);
            setDisabledBtn("disableOff");
            setValue("");
            stepAdd++;
        }
    }

    async function dequeue() {
        if (stepRemove <= 6) {
            setLoaderBtnDel(true);
            setDisabledBtn("disableOn");
            if (stepAdd - 1 === 0) {
                updateCircleElement(stepRemove, "", ElementStates.Default, "", "");
                stepAdd = 0;
                stepRemove = -1;
                queue.clear();
            } else if (stepAdd === stepRemove + 1) {
                updateCircleElement(stepAdd - 1, "", ElementStates.Changing, "", "");

                await timeout(500);
                resultChar[stepAdd - 1].state = ElementStates.Default;
                circleElements = resultChar.map((item => {
                    return (
                        <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail}
                                state={item.state} key={v4()}/>
                    )
                }));

                setElements(circleElements);
                stepAdd = 0;
                stepRemove = -1;
                queue.clear();
            } else {
                resultChar[stepRemove].char = "";
                resultChar[stepRemove].state = ElementStates.Default;
                resultChar[stepRemove].head = "";
                resultChar[stepRemove + 1].state = ElementStates.Changing;
                resultChar[stepRemove + 1].head = "head";
                circleElements = resultChar.map((item => {
                    return (
                        <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail}
                                state={item.state} key={v4()}/>
                    )
                }))
                setElements(circleElements);
                queue.dequeue();
            }
            await timeout(500);

            resultChar[stepRemove + 1].state = ElementStates.Default;
            circleElements = resultChar.map((item => {
                return (
                    <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail} state={item.state}
                            key={v4()}/>
                )
            }));
            setElements(circleElements);
            setLoaderBtnDel(false);
            setDisabledBtn("disableOff");
            stepRemove++;
        }
    }

    function clearQueue() {
        setDisabledBtn("disableOn");
        queue.clear();
        stepAdd = 0;
        stepRemove = 0;
        resultChar.length = 0;
        createItemsArr();
        setDisabledBtn("disableOff");
    }

    return (
        <SolutionLayout title="Очередь">
            <div className={styles.queue}>
                <div className={styles.queue__flexBox}>
                    <div className={styles.queue__inputBox}>
                        <Input placeholder={"Введите текст"} value={value} maxLength={4}
                               isLimitText={true}
                               onChange={handleChange}/>
                    </div>
                    <Button type={"button"} text={"Добавить"} linkedList={"small"}
                            disabled={value.length === 0 || disabledBtn === "disableOn"}
                            isLoader={loaderBtnAdd}
                            onClick={() => enqueue(value)}/>
                    <Button type={"button"} text={"Удалить"} linkedList={"small"}
                            isLoader={loaderBtnDel}
                            disabled={queue.size() === 0 || disabledBtn === "disableOn"}
                            onClick={() => dequeue()}/>
                </div>
                <Button type={"button"} text={"Очистить"} linkedList={"small"}
                        disabled={queue.size() === 0 || disabledBtn === "disableOn"}
                        onClick={() => clearQueue()}/>
            </div>
            <div className={styles.queue__itemsBox}>
                {elements}
            </div>
        </SolutionLayout>
    )
}