import React, {useState, useEffect} from "react";
import styles from "./list.module.css"
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {getRandomNumber, timeout} from "../../utils/utils";
import {v4} from "uuid";
import LinkedListNode from "./linkedListNode";
import {ElementStates} from "../../types/element-states";
import LinkedList from "./linkedList";

type TResultNodes = {
    head: string | React.ReactElement | null;
    letter: string;
    tail: string | React.ReactElement | null;
    index: number;
    state: ElementStates;
}
let resultNodes: TResultNodes[] = [];

export const ListPage: React.FC = () => {

    const randomArr = () => {
        const amountElement = getRandomNumber(4, 6);
        const arrNumbers: LinkedList<any> = new LinkedList();

        for (let i = 0; i <= amountElement; i++) {
          arrNumbers.prepend(getRandomNumber(0, 10000).toString());
        }

        return arrNumbers;
    }

    const [value, setValue] = useState<string>("");
    const [indexValue, setIndexValue] = useState<string>("");
    /* TODO: переменная linkedList хука useState необходима для хранения экземпляра класса LinkedList,
        в дальнейшем её состояние неизменяется
     */
    const [linkedList, setLinkedList] = useState<LinkedList<string>>(randomArr); // eslint-disable-line
    const [elements, setElements] = useState<JSX.Element[]>([]);
    const [disabledBtn, setDisabledBtn] = useState<string>("disableOff");
    const [loaderAddHead, setLoaderAddHead] = useState<boolean>(false);
    const [loaderAddTail, setLoaderAddTail] = useState<boolean>(false);
    const [loaderDelHead, setLoaderDelHead] = useState<boolean>(false);
    const [loaderDelTail, setLoaderDelTail] = useState<boolean>(false);
    const [loaderAddByIndex, setLoaderAddByIndex] = useState<boolean>(false);
    const [loaderDelByIndex, setLoaderDelByIndex] = useState<boolean>(false);

    let circleElements: JSX.Element[];

    // TODO: хук useEffect должен срабатывать только при монтировании и размантировании страницы
    useEffect(() => {
        createInitialArr();

        return () => {
          resultNodes.length = 0;
          setElements([]);
        }
    }, []); // eslint-disable-line

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    }

    const handleChangeIndexValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const result = event.target.value.replace(/\D/g, "");
        setIndexValue(result);
    }

    const createInitialArr = () => {
        const arrayNodes = linkedList.toArray();

        updateResultNodes(arrayNodes);

        resultNodes[0].head = "head";
        resultNodes[resultNodes.length - 1].tail = "tail";

        updateCircleElement(resultNodes);
    }

    function updateResultNodes(array: LinkedListNode<string>[]) {
        resultNodes.length = 0;

        array.forEach((item, index) => {
            resultNodes.push({
              head: "",
              letter: item.value,
              tail: "",
              index: index,
              state: ElementStates.Default
            })
        })
    }

    function updateCircleElement(array: TResultNodes[]) {
        circleElements = array.map(el => {
            return (
                <div className={styles.list__flexBox} key={v4()}>
                    <Circle head={el.head} letter={el.letter} state={el.state} tail={el.tail} index={el.index}/>
                    <ArrowIcon fill={`${el.index === resultNodes.length - 1 ? "#0000" : "#0032FF"}`}/>
                </div>
            )
        })
        setElements(circleElements);
    }

    async function addHead(item: string) {
        setDisabledBtn("disabledOn");
        setLoaderAddHead(true);
        if (linkedList.toArray().length === 0) {
            linkedList.prepend(item);

            resultNodes.length = 0;

            linkedList.toArray().forEach((item, index) => {
              resultNodes.push({
                head: "head",
                letter: item.value,
                tail: "tail",
                index: index,
                state: ElementStates.Modified
              })
          })
            updateCircleElement(resultNodes);

            await timeout(500);
            resultNodes[0].state = ElementStates.Default;
            updateCircleElement(resultNodes);
        } else {
            const circleHead = <Circle letter={item} state={ElementStates.Changing} isSmall={true}/>
            resultNodes[0].head = circleHead;

            updateCircleElement(resultNodes);

            linkedList.prepend(item);

            await timeout(500);

            resultNodes.length = 0;

            linkedList.toArray().forEach((item, index) => {
                resultNodes.push({
                  head: null,
                  letter: item.value,
                  tail: null,
                  index: index,
                  state: ElementStates.Default
                })
            })

            resultNodes[0].head = "head";
            resultNodes[1].head = "";
            resultNodes[resultNodes.length - 1].tail = "tail";
            resultNodes[0].state = ElementStates.Modified;

            updateCircleElement(resultNodes);

            await timeout(500);

            resultNodes[0].state = ElementStates.Default;
            updateCircleElement(resultNodes);
        }
        setLoaderAddHead(false);
        setValue("");
        setDisabledBtn("disabledOff");
    }

    async function deleteHead() {
        setLoaderDelHead(true);
        setDisabledBtn("disabledOn");
        const arraySize = linkedList.toArray().length;
        const circleTail = <Circle letter={resultNodes[0].letter} state={ElementStates.Changing} isSmall={true}/>

        if (arraySize <= 2) {
          if (arraySize <= 1) {
              linkedList.deleteHead();
              updateResultNodes(linkedList.toArray());
              updateCircleElement(resultNodes);
              setLoaderDelHead(false);
              setDisabledBtn("disabledOff");
              return
          }

            resultNodes[0].letter = "";
            resultNodes[0].tail = circleTail;

            updateCircleElement(resultNodes);

            await timeout(500);
            linkedList.deleteHead();

            updateResultNodes(linkedList.toArray());
            resultNodes[0].head = "head";
            resultNodes[resultNodes.length - 1].tail = "tail";
            updateCircleElement(resultNodes);
        } else {
            resultNodes[0].letter = "";
            resultNodes[0].tail = circleTail;

            updateCircleElement(resultNodes);

            await timeout(500);
            linkedList.deleteHead();

            updateResultNodes(linkedList.toArray());
            resultNodes[0].head = "head";
            resultNodes[1].head = "";
            resultNodes[resultNodes.length - 1].tail = "tail";
            updateCircleElement(resultNodes);
        }
        setLoaderDelHead(false);
        setDisabledBtn("disabledOff");
    }

    async function addTail(item: string) {
        setLoaderAddTail(true);
        setDisabledBtn("disabledOn");
        if (linkedList.toArray().length === 0) {
            linkedList.append(item);

            resultNodes.length = 0;
            linkedList.toArray().forEach((item, index) => {
                resultNodes.push({
                  head: "head",
                  letter: item.value,
                  tail: "tail",
                  index: index,
                  state: ElementStates.Modified
                })
            })
            updateCircleElement(resultNodes);

            await timeout(500);
            resultNodes[0].state = ElementStates.Default;
            updateCircleElement(resultNodes);
        } else {
            const circleTail = <Circle letter={item} state={ElementStates.Changing} isSmall={true}/>
            resultNodes[linkedList.toArray().length - 1].tail = circleTail;

            updateCircleElement(resultNodes);

            linkedList.append(item);

            await timeout(500);

            resultNodes.length = 0;
            linkedList.toArray().forEach((item, index) => {
                resultNodes.push({
                  head: null,
                  letter: item.value,
                  tail: null,
                  index: index,
                  state: ElementStates.Default
                })
            })

            resultNodes[0].head = "head";
            resultNodes[linkedList.toArray().length - 1].tail = "tail";
            resultNodes[linkedList.toArray().length - 2].tail = "";
            resultNodes[linkedList.toArray().length - 1].state = ElementStates.Modified;

            updateCircleElement(resultNodes);

            await timeout(500);

            resultNodes[linkedList.toArray().length - 1].state = ElementStates.Default;
            updateCircleElement(resultNodes);
        }
        setLoaderAddTail(false);
        setValue("");
        setDisabledBtn("disabledOff");
    }

    async function deleteTail() {
        setLoaderDelTail(true);
        setDisabledBtn("disabledOn");
        const arraySize = linkedList.toArray().length;
        const circleTail = <Circle letter={resultNodes[arraySize - 1].letter} state={ElementStates.Changing}
                                   isSmall={true}/>
        if (arraySize === 1) {
            resultNodes[arraySize - 1].letter = "";
            resultNodes[arraySize - 1].tail = circleTail;

            updateCircleElement(resultNodes);

            await timeout(500);
            linkedList.deleteTail();
            updateResultNodes(linkedList.toArray());
            updateCircleElement(resultNodes);
        } else {
            resultNodes[arraySize - 1].letter = "";
            resultNodes[arraySize - 1].tail = circleTail;

            updateCircleElement(resultNodes);

            await timeout(500);
            linkedList.deleteTail();

            updateResultNodes(linkedList.toArray());
            resultNodes[0].head = "head";
            resultNodes[resultNodes.length - 1].tail = "tail";
            updateCircleElement(resultNodes);
        }
        setLoaderDelTail(false);
        setDisabledBtn("disabledOff");
    }

    async function addByIndex(item: string, index: string) {
        setLoaderAddByIndex(true);
        setDisabledBtn("disabledOn");
        const arraySize = linkedList.toArray().length;
        const circleHead = <Circle letter={item} state={ElementStates.Changing} isSmall={true}/>
        const ind = Number(index);
        let count = 0;

        if (ind > arraySize - 1) {
            setLoaderAddByIndex(false);
            setDisabledBtn("disabledOff");
            throw new Error("Введенное значение не должны быть больше, чем количество узлов");
        }

        while (count <= ind) {
            resultNodes[count].head = circleHead;
            updateCircleElement(resultNodes);
            count++;
            await timeout(500);
            resultNodes[count - 1].head = "";
            resultNodes[count - 1].state = ElementStates.Changing;
            resultNodes[0].head = "head";
            updateCircleElement(resultNodes);
        }

        linkedList.addByIndex(item, ind);
        updateResultNodes(linkedList.toArray());

        resultNodes[ind].state = ElementStates.Modified;
        resultNodes[0].head = "head";
        resultNodes[arraySize].tail = "tail";
        updateCircleElement(resultNodes);

        await timeout(500);

        resultNodes[ind].state = ElementStates.Default;
        updateCircleElement(resultNodes);
        setLoaderAddByIndex(false);
        setValue("");
        setIndexValue("");
        setDisabledBtn("disabledOff");
    }

    async function deleteByIndex(index: string) {
        setLoaderDelByIndex(true);
        setDisabledBtn("disabledOn");

        const arraySize = linkedList.toArray().length;
        const ind = Number(index);

        if (ind > arraySize - 1) {
            setLoaderDelByIndex(false);
            setDisabledBtn("disabledOff");
            throw new Error("Введенное значение не должны быть больше, чем количество узлов");
        }

        const circleTail = <Circle letter={resultNodes[ind].letter} state={ElementStates.Changing} isSmall={true}/>
        let count = 0;

        if (arraySize === 1) {
            resultNodes[ind].state = ElementStates.Changing;
            updateCircleElement(resultNodes);
            await timeout(500);
            resultNodes[ind].state = ElementStates.Default;
            resultNodes[ind].letter = "";
            resultNodes[ind].tail = circleTail;
            updateCircleElement(resultNodes);
            await timeout(500);
            linkedList.deleteByIndex(Number(index));
            updateResultNodes(linkedList.toArray());
            updateCircleElement(resultNodes);
        } else {
            while (count <= ind) {
                resultNodes[count].state = ElementStates.Changing;
                updateCircleElement(resultNodes);
                await timeout(500);
                count++;
            }

            resultNodes[ind].state = ElementStates.Default;
            resultNodes[ind].letter = "";
            resultNodes[ind].tail = circleTail;
            updateCircleElement(resultNodes);

            await timeout(500);
            linkedList.deleteByIndex(Number(index));

            updateResultNodes(linkedList.toArray());
            resultNodes[0].head = "head";
            resultNodes[arraySize - 2].tail = "tail";
            updateCircleElement(resultNodes);
        }
        setLoaderDelByIndex(false);
        setDisabledBtn("disabledOff");
        setIndexValue("");
    }

    return (
        <SolutionLayout title="Связный список">
            <div className={styles.list}>
                <div>
                    <Input placeholder={"Введите значение"} maxLength={4} isLimitText={true} value={value}
                         onChange={handleChangeValue}/>
                </div>
                <Button type={"button"} text={"Добавить в head"} linkedList={"small"}
                        isLoader={loaderAddHead}
                        disabled={value.length === 0 || disabledBtn === "disabledOn"}
                        onClick={() => addHead(value)}
                />
                <Button type={"button"} text={"Добавить в tail"} linkedList={"small"}
                        isLoader={loaderAddTail}
                        disabled={value.length === 0 || disabledBtn === "disabledOn"}
                        onClick={() => addTail(value)}
                />
                <Button type={"button"} text={"Удалить из head"} linkedList={"small"}
                        isLoader={loaderDelHead}
                        disabled={linkedList.toArray().length === 0 || disabledBtn === "disabledOn"}
                        onClick={() => deleteHead()}
                />
                <Button type={"button"} text={"Удалить из tail"} linkedList={"small"}
                        isLoader={loaderDelTail}
                        disabled={linkedList.toArray().length === 0 || disabledBtn === "disabledOn"}
                        onClick={() => deleteTail()}
                />
                <div>
                  <Input placeholder={"Введите индекс"} value={indexValue}
                         type={"text"} onChange={handleChangeIndexValue}/>
                </div>
                <Button type={"button"} text={"Добавить по индексу"} linkedList={"big"}
                        isLoader={loaderAddByIndex}
                        disabled={value.length === 0 || indexValue.length === 0 || disabledBtn === "disabledOn"}
                        onClick={() => addByIndex(value, indexValue)}
                />
                <Button type={"button"} text={"Удалить по индексу"} linkedList={"big"}
                        isLoader={loaderDelByIndex}
                        disabled={linkedList.toArray().length === 0 ||
                            indexValue.length === 0 ||
                            disabledBtn === "disabledOn"}
                        onClick={() => deleteByIndex(indexValue)}
                />
            </div>
            <div className={styles.list__linkedList}>{elements}</div>
        </SolutionLayout>
    );
};
