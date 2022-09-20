import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {v4} from "uuid";

type TProps = {}
type TState = {
    value: string,
    arrayString: string[],
    elements: JSX.Element[],
    visible: boolean,
    disable: string,
    loader: string
}

export class Queue extends React.Component<TProps, TState> {
    constructor(props: TProps) {
        super(props);
        this.state = ({
            value: "",
            arrayString: [],
            visible: true,
            elements: [],
            disable: "",
            loader: ""
        })
        this._timeout = this._timeout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createItemsArr = this.createItemsArr.bind(this);
        this.arraySize = this.arraySize.bind(this);
        this.enqueue = this.enqueue.bind(this);
        this.dequeue = this.dequeue.bind(this);
        this.clearQueue = this.clearQueue.bind(this);
        this.resultChar = [];
        this.stepAdd = 0;
        this.stepRemove = 0;
        this.circleElements = [];
    }

    resultChar: {
        char: string,
        state: ElementStates,
        head: string,
        tail: string,
        index: number
    }[] = [];
    stepAdd = 0;
    stepRemove = 0;
    circleElements: JSX.Element[] = [];

    componentDidMount() {
        this.setState({elements: this.createItemsArr()});
    }

    _timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: event.target.value})
    }

    createItemsArr() {
        let i = 0
        while (i <= 6) {
            this.resultChar.push({char: "", state: ElementStates.Default, head: "", tail: "", index: i});
            this.circleElements = this.resultChar.map(item => {
                return (
                    <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail} state={item.state}
                            key={v4()}/>
                )
            })
            i++
        }
        return this.circleElements;
    }

    arraySize(array: {
        char: string,
        state: ElementStates,
        head: string,
        tail: string,
        index: number
    }[]) {
        return array.length;
    }

    async enqueue(item: string) {
        if (this.stepAdd <= 6) {
            this.setState({loader: "enqueue"});
            this.setState({disable: "enqueue"});
            if (this.stepAdd === 0) {
                this.resultChar[this.stepAdd].char = item;
                this.resultChar[this.stepAdd].state = ElementStates.Changing;
                this.resultChar[this.stepAdd].head = "head";
                this.resultChar[this.stepAdd].tail = "tail";
                this.circleElements = this.resultChar.map((item => {
                    return (
                        <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail}
                                state={item.state} key={v4()}/>
                    )
                }))
                this.setState({elements: this.circleElements});
            } else {
                this.resultChar[this.stepAdd].char = item;
                this.resultChar[this.stepAdd].state = ElementStates.Changing;
                this.resultChar[this.stepAdd].head = "";
                this.resultChar[this.stepAdd].tail = "tail";
                this.resultChar[this.stepAdd - 1].tail = "";
                this.circleElements = this.resultChar.map((item => {
                    return (
                        <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail}
                                state={item.state} key={v4()}/>
                    )
                }))
                this.setState({elements: this.circleElements});
            }
            await this._timeout(500);
            this.resultChar[this.stepAdd].state = ElementStates.Default;
            this.circleElements = this.resultChar.map((item => {
                return (
                    <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail} state={item.state}
                            key={v4()}/>
                )
            }))
            this.stepAdd++;
            this.setState({elements: this.circleElements});
            this.setState({value: ""});
            this.setState({loader: ""});
            this.setState({disable: ""})
        }

    }

    async dequeue() {
        if (this.stepRemove <= 6) {
            this.setState({loader: "dequeue"});
            this.setState({disable: "dequeue"});
            if (this.stepAdd - 1 === 0) {
                this.resultChar[this.stepRemove].char = "";
                this.resultChar[this.stepRemove].state = ElementStates.Default;
                this.resultChar[this.stepRemove].head = "";
                this.resultChar[this.stepRemove].tail = "";
                this.circleElements = this.resultChar.map((item => {
                    return (
                        <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail}
                                state={item.state} key={v4()}/>
                    )
                }))
                this.stepAdd = 0;
                this.stepRemove = -1;
                this.setState({elements: this.circleElements});
            } else if (this.stepAdd === this.stepRemove + 1) {
                this.resultChar[this.stepAdd - 1].char = "";
                this.resultChar[this.stepAdd - 1].state = ElementStates.Changing;
                this.resultChar[this.stepAdd - 1].head = "head";
                this.resultChar[this.stepAdd - 1].tail = "";
                this.circleElements = this.resultChar.map((item => {
                    return (
                        <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail}
                                state={item.state} key={v4()}/>
                    )
                }));
                this.setState({elements: this.circleElements});
                await this._timeout(500)
                this.resultChar[this.stepAdd - 1].state = ElementStates.Default;
                this.circleElements = this.resultChar.map((item => {
                    return (
                        <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail}
                                state={item.state} key={v4()}/>
                    )
                }));
                this.stepAdd = 0;
                this.stepRemove = -1;
                this.setState({elements: this.circleElements});
            } else {
                this.resultChar[this.stepRemove].char = "";
                this.resultChar[this.stepRemove].state = ElementStates.Default;
                this.resultChar[this.stepRemove].head = "";
                this.resultChar[this.stepRemove + 1].state = ElementStates.Changing;
                this.resultChar[this.stepRemove + 1].head = "head";
                this.circleElements = this.resultChar.map((item => {
                    return (
                        <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail}
                                state={item.state} key={v4()}/>
                    )
                }))
                this.setState({elements: this.circleElements});
            }
            await this._timeout(500);
            this.resultChar[this.stepRemove + 1].state = ElementStates.Default;
            this.circleElements = this.resultChar.map((item => {
                return (
                    <Circle index={item.index} letter={item.char} head={item.head} tail={item.tail} state={item.state}
                            key={v4()}/>
                )
            }))
            this.stepRemove++;
            this.setState({elements: this.circleElements});
            this.setState({disable: ""});
            this.setState({loader: ""});
            this.setState({disable: ""});
        }
    }

    clearQueue() {
        this.stepAdd = 0;
        this.stepRemove = 0;
        this.resultChar.length = 0;
        this.setState({elements: this.createItemsArr()});
        this.setState({value: ""});
    }

    render() {
        return (
            <SolutionLayout title="Очередь">
                <div className={styles.queue}>
                    <div className={styles.queue__flexBox}>
                        <div className={styles.queue__inputBox}>
                            <Input placeholder={"Введите текст"} value={this.state.value} maxLength={4}
                                   isLimitText={true}
                                   onChange={this.handleChange}/>
                        </div>
                        <Button type={"button"} text={"Добавить"} linkedList={"small"}
                                isLoader={this.state.loader === "enqueue"}
                                disabled={(this.state.value.length === 0) || (this.state.disable === "dequeue")}
                                onClick={() => this.enqueue(this.state.value)}/>
                        <Button type={"button"} text={"Удалить"} linkedList={"small"}
                                isLoader={this.state.loader === "dequeue"}
                                disabled={(this.stepAdd === 0) || (this.state.disable === "enqueue")}
                                onClick={() => this.dequeue()}/>
                    </div>
                    <Button type={"button"} text={"Очистить"} linkedList={"small"}
                            disabled={(this.stepAdd === 0) && (this.stepRemove === 0) || (this.state.disable !== "")}
                            onClick={() => this.clearQueue()}/>
                </div>
                <div className={styles.queue__itemsBox}>
                    {this.state.elements}
                </div>
            </SolutionLayout>
        )
    }
}
