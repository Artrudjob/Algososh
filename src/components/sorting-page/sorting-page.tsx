import React from "react";
import styles from "./sorting-page.module.css";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {v4} from "uuid";

type TResultNumber = {
  number: number;
  state: ElementStates | undefined;
}

export const SortingPage: React.FC = () => {

  const [value, setValue] = React.useState<string>("selection");
  const [isVisible, setVisible] = React.useState<boolean>(false);
  const [elements, setElements] = React.useState<JSX.Element[]>([]);
  const [resultArr, setResultArr] = React.useState<number[]>([]);
  const [loaderAscending, setLoaderAscending] = React.useState<boolean>(false);
  const [loaderDescending, setLoaderDescending] = React.useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = React.useState<string>("disableOff");

  let resultNumber: TResultNumber[] = [];

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function randomArr() {
    const amountElement = getRandomNumber(3, 17);
    const arrNumbers: number[] = [];

    for (let i = 0; i <= amountElement; i++) {
      arrNumbers.push(getRandomNumber(0, 100));
    }

    setResultArr(arrNumbers);
    return arrNumbers;
  }

  function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function swap(arr: number[], firstIndex: number, secondIndex: number): void {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }

  function changeLoaderState(ascending: boolean): void {
    ascending ? setLoaderAscending(true) : setLoaderDescending(true);
  }

  async function selectionSort(array: number[], ascending = true) {
    changeLoaderState(ascending);
    ascending ? setDisabledBtn("bubble") : setDisabledBtn("selection");

    array.forEach(item => {
      resultNumber.push({
        number: item,
        state: ElementStates.Default
      })
    })
    let columnElements = resultNumber.map(item => {
      return (
          <Column index={item.number} state={item.state} key={v4()} extraClass={styles.sort__column}/>
      )
    })
    setElements(columnElements);

    let boolean;

    for (let i = 0; i < array.length; i++) {
      let indexMin = i;
      resultNumber[indexMin].state = ElementStates.Changing;
      columnElements = resultNumber.map(item => {
        return (
            <Column index={item.number} state={item.state} key={v4()} extraClass={styles.sort__column}/>
        )
      })
      setElements(columnElements);
      for (let j = i + 1; j < array.length; j++) {
        await timeout(1000);
        resultNumber[j].state = ElementStates.Changing;
        columnElements = resultNumber.map(item => {
          return (
              <Column index={item.number} state={item.state} key={v4()} extraClass={styles.sort__column}/>
          )
        })
        setElements(columnElements);

        if (j - i > 1) {
          resultNumber[j - 1].state = ElementStates.Default;
          columnElements = resultNumber.map(item => {
            return (
                <Column index={item.number} state={item.state} key={v4()} extraClass={styles.sort__column}/>
            )
          })
          setElements(columnElements);
        }

        if (ascending) {
          boolean = array[j] <= array[indexMin];
        } else {
          boolean = array[j] >= array[indexMin];
        }

        if (boolean) {
          indexMin = j;
        }


      }
      swap(array, i, indexMin);
      await timeout(1000);

      resultNumber[array.length - 1].state = ElementStates.Default;

      resultNumber[i].state = ElementStates.Modified;
      resultNumber[i].number = array[i];

      if (resultNumber[i].number !== resultNumber[indexMin].number) {
        resultNumber[indexMin].state = ElementStates.Default;
      }

      resultNumber[indexMin].number = array[indexMin];
      columnElements = resultNumber.map(item => {
        return (
            <Column index={item.number} state={item.state} key={v4()} extraClass={styles.sort__column}/>
        )
      })
      setElements(columnElements);
    }
    setLoaderAscending(false);
    setLoaderDescending(false);
    setDisabledBtn("disableOff");
  }

  async function bubbleSort(array: number[], ascending = true) {
    changeLoaderState(ascending);
    ascending ? setDisabledBtn("bubble") : setDisabledBtn("selection");

    array.forEach(item => {
      resultNumber.push({
        number: item,
        state: ElementStates.Default
      })
    })
    let columnElements = resultNumber.map(item => {
      return (
          <Column index={item.number} state={item.state} key={v4()} extraClass={styles.sort__column}/>
      )
    })
    setElements(columnElements);

    let boolean;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (ascending) {
          boolean = array[j + 1] < array[j]
        } else {
          boolean = array[j + 1] > array[j]
        }
        if (boolean) {
          resultNumber[j].state = ElementStates.Changing;
          resultNumber[j + 1].state = ElementStates.Changing;
          columnElements = resultNumber.map(item => {
            return (
                <Column index={item.number} state={item.state} key={v4()} extraClass={styles.sort__column}/>
            )
          })
          setElements(columnElements);

          swap(array, j, j + 1);
          await timeout(1000);

          resultNumber[j].state = ElementStates.Default;
          resultNumber[j].number = array[j];
          resultNumber[j + 1].state = ElementStates.Default;
          resultNumber[j + 1].number = array[j + 1];
          columnElements = resultNumber.map(item => {
            return (
                <Column index={item.number} state={item.state} key={v4()} extraClass={styles.sort__column}/>
            )
          })
          setElements(columnElements);
        }
      }
      resultNumber[resultArr.length - 1 - i].state = ElementStates.Modified;
      resultNumber[resultArr.length - 1 - i].number = array[resultArr.length - 1 - i];
      columnElements = resultNumber.map(item => {
        return (
            <Column index={item.number} state={item.state} key={v4()} extraClass={styles.sort__column}/>
        )
      })
      setElements(columnElements);
    }
    setLoaderAscending(false);
    setLoaderDescending(false);
    setDisabledBtn("disableOff");
  }

  function showNumbersArr() {
    const arr = randomArr();

    arr.forEach(item => {
      resultNumber.push({
        number: item,
        state: ElementStates.Default
      })
    });

    let columnElements: JSX.Element[] = resultNumber.map(item => {
      return (
          <Column index={item.number} state={item.state} key={v4()} extraClass={styles.sort__column}/>
      )
    });

    setElements(columnElements)
    setVisible(true);
  }

  return (
      <SolutionLayout title="Сортировка массива">
        <div className={`${styles.sort} ${styles.sort__flexBox}`}>
          <div className={`${styles.sort__flexBox} ${styles.sort__radioBox}`}>
            <RadioInput label={"Выбор"} name={"sort"} value={"selection"} defaultChecked={value === "selection"}
                        onChange={handleChange}/>
            <RadioInput label={"Пузырёк"} name={"sort"} value={"bubble"} checked={value === "bubble"}
                        onChange={handleChange}/>
          </div>
          <div className={`${styles.sort__flexBox} ${styles.sort__btnBox}`}>
            <Button text={"По возрастанию"} sorting={Direction.Ascending} style={{width: "205px"}} type={"button"} isLoader={loaderAscending}
                    disabled={(elements.length <= 0) || (disabledBtn === "selection")}
                    onClick={(value === "selection") ? () => selectionSort(resultArr, true) : () => bubbleSort(resultArr, true)}/>
            <Button text={"По убыванию"} sorting={Direction.Descending} style={{width: "205px"}} type={"button"} isLoader={loaderDescending}
                    disabled={(elements.length <= 0) || (disabledBtn === "bubble")}
                    onClick={(value === "selection") ? () => selectionSort(resultArr, false) : () => bubbleSort(resultArr, false)}/>
          </div>
          <Button text={"Новый массив"} linkedList={"small"} style={{width: "205px"}} type={"button"}
                  disabled={disabledBtn !== "disableOff"}
                  onClick={showNumbersArr}/>
        </div>
        <div className={styles.sort__columnContainer}>
          {isVisible && <div className={styles.sort__columnContainer}>{elements}</div>}
        </div>
      </SolutionLayout>
  );
};
