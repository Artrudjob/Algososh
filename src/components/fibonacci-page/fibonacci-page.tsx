import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {v4} from "uuid";
import {timeout} from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
    const [isValue, setValue] = React.useState<string>("");
    const [loader, setLoader] = React.useState<boolean>(false);
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [isVisible, setVisible] = React.useState<boolean>(true);
    const [elements, setElements] = React.useState<JSX.Element[]>([]);

    function getFibonacciNumbers(n: number): number[] {
        let arr: number[] = [1, 1];
        for (let i = 2; i < n + 1; i++) {
            arr.push(arr[i - 2] + arr[i - 1])
        }

        return arr
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value);
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }
        if (event.target.value.length === 0) {
            setDisabled(true);
            setVisible(true);
        } else {
            setDisabled(false);
        }
    }

    async function handleBtnClick() {
        setLoader(true);
        setVisible(false);
        const valueNumb = Number(isValue);
        const arr = getFibonacciNumbers(valueNumb);

        let newArr: number[] = [];
        let i = 0;
        while (i <= arr.length - 1) {
            newArr.push(arr[i]);
            await timeout(1000);
            let circleElement = newArr.map((item, index) => {
                return (
                    <div key={v4()}>
                        <Circle letter={String(item)} state={ElementStates.Default}/>
                        <span className={styles.fibonacci__number}>{index}</span>
                    </div>
                )
            })
            setElements(circleElement);
            i++;
        }
        setLoader(false);
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={styles.fibonacci__box}>
                <div className={styles.fibonacci__inputBox}>
                    <Input isLimitText={true} maxLength={2} min={0} max={19} value={isValue} onChange={handleChange}
                           type={"number"}/>
                </div>
                <Button text={"Рассчитать"} type={"button"} isLoader={loader} disabled={disabled}
                        onClick={handleBtnClick} extraClass={"ml-6"} linkedList={"small"}/>
            </div>
            {!isVisible &&
                <div className={styles.fibonacci__flex}>
                    {elements}
                </div>
            }
        </SolutionLayout>
    );
};
