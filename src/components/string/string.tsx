import React, {useState} from "react";
import styles from "./string.module.css";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {v4} from "uuid";
import {timeout, swap} from "../../utils/utils";

type TResultChar = {
    letter: string;
    state: ElementStates;
}

export const StringComponent: React.FC = (): JSX.Element => {

    const [isValue, setValue] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [isVisible, setVisible] = useState<boolean>(true);
    const [elements, setElements] = useState<JSX.Element[]>([]);

    let resultChar: TResultChar[] = [];

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value);
        if (event.target.value.length === 0) {
            setDisabled(true);
            setVisible(true);
        } else {
            setDisabled(false);
        }
    }

    async function handleBtnClick(): Promise<void> {
        setLoader(true);
        setVisible(false);

        const arr = isValue.toUpperCase().split('');

        arr.forEach(item => {
            resultChar.push({
                letter: item,
                state: ElementStates.Default
            })
        })

        let circleElement = resultChar.map(item => {
            return (
                <Circle letter={item.letter} state={item.state} key={v4()}/>
            )
        })
        setElements(circleElement);

        let start = 0;
        let end = arr.length - 1;

        if (start === end) {
            setElements([
                <Circle letter={arr[0]} state={ElementStates.Modified} key={v4()}/>
            ])
            setLoader(false);
        } else {
            while (start <= end) {
                resultChar[start].state = ElementStates.Changing;
                resultChar[end].state = ElementStates.Changing;
                circleElement = resultChar.map(item => {
                    return (
                        <Circle letter={item.letter} state={item.state} key={v4()}/>
                    )
                })
                setElements(circleElement);

                swap(arr, start, end);

                await timeout(2000);

                resultChar[start].state = ElementStates.Modified;
                resultChar[start].letter = arr[start];
                resultChar[end].state = ElementStates.Modified;
                resultChar[end].letter = arr[end];
                circleElement = resultChar.map(item => {
                    return (
                        <Circle letter={item.letter} state={item.state} key={v4()}/>
                    )
                })
                setElements(circleElement);

                start++;
                end--;
            }
            setLoader(false);
        }
    }

    return (
        <SolutionLayout title="Строка">
            <div className={styles.string__box}>
                <div className={styles.string__inputBox}>
                    <Input maxLength={11} isLimitText={true} value={isValue} onChange={handleChange}/>
                </div>
                <Button data-testid={"button"} text={"Развернуть"} type={"button"} isLoader={loader} disabled={disabled}
                        onClick={handleBtnClick}/>
            </div>
            {!isVisible &&
                <div className={styles.string__flex}>
                    {elements}
                </div>
            }
        </SolutionLayout>
    );
}
