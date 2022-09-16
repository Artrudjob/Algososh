import React from "react";
import styles from "./stack.module.css";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
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
}

export class Stack extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = ({
      value: "",
      arrayString: [],
      visible: true,
      elements: [],
      disable: "",
    })
    this._timeout = this._timeout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.arraySize = this.arraySize.bind(this);
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.removeArray = this.removeArray.bind(this);
    this.resultChar = [];
  }
  resultChar: {
    char: string,
    state: ElementStates,
    head: string,
    index: string
  }[] = [];

  _timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({value: event.target.value})
  }

  arraySize(array: {
    char: string,
    state: ElementStates,
    head: string,
    index: string
  }[]) {
    return array.length;
  }

  async push(item: string) {
    if (item.length === 0) {
      return null;
    } else {
      this.setState({disable: "push"});
      this.resultChar.push({char: item, state: ElementStates.Changing, head: "top", index: ""});

      let circleElement = this.resultChar.map((item, index) => {
        return (
            <Circle index={index} head={item.head} letter={item.char} state={item.state} key={v4()} />
        )
      })
      this.setState({elements: circleElement});

      const arrSize = this.arraySize(this.resultChar);

      await this._timeout(500);
      this.setState({disable: ""});
      this.resultChar[arrSize-1].state = ElementStates.Default;

      circleElement = this.resultChar.map((item, index) => {
        return (
            <Circle index={index} head={item.head} letter={item.char} state={item.state} key={v4()} />
        )
      })
      this.setState({elements: circleElement});

      for (let i = 0; i < arrSize; i++) {
        if (i < arrSize) {
          this.resultChar[arrSize-1].head = "";
        }
      }
    }
  }

  async pop() {
    const arrSize = this.arraySize(this.resultChar);
    if (arrSize === 1) {
      this.setState({disable: "pop"});
      this.resultChar.length = 0;
      this.setState({elements: []});
      this.setState({value: ""});
    } else {
      this.setState({disable: "pop"});
      this.resultChar[arrSize-1].state = ElementStates.Changing;
      this.resultChar[arrSize-1].head = "top";
      let circleElement = this.resultChar.map((item, index) => {
        return (
            <Circle index={index} head={item.head} letter={item.char} state={item.state} key={v4()} />
        )
      })
      this.setState({elements: circleElement});

      await this._timeout(500);

      this.setState({disable: ""});

      this.resultChar.pop();
      this.resultChar[arrSize-2].head = "top";
      circleElement = this.resultChar.map((item, index) => {
        return (
            <Circle index={index} head={item.head} letter={item.char} state={item.state} key={v4()} />
        )
      })
      this.setState({elements: circleElement});
    }
  }

  removeArray() {
    this.resultChar.length = 0;
    this.setState({elements: []});
    this.setState({value: ""});
  }

  render() {
    return (
        <SolutionLayout title="Стек">
          <div className={styles.stack}>
            <div className={styles.stack__flexBox}>
              <div className={styles.stack__inputBox}>
                <Input placeholder={"Введите текст"} value={this.state.value} maxLength={4} isLimitText={true}
                       onChange={this.handleChange} />
              </div>
              <Button type={"button"} text={"Добавить"} linkedList={"small"}
                      disabled={(this.state.value.length === 0) || (this.state.disable === "push")}
                      onClick={() => this.push(this.state.value)}/>
              <Button type={"button"} text={"Удалить"} linkedList={"small"}
                      disabled={(this.arraySize(this.resultChar) === 0) || (this.state.disable === "pop")}
                      onClick={() => this.pop()} />
            </div>
            <Button type={"button"} text={"Очистить"} linkedList={"small"}
                    disabled={(this.arraySize(this.resultChar) === 0)}
                    onClick={() => this.removeArray()} />
          </div>
          <div className={styles.stack__itemsBox}>
            {this.state.elements}
          </div>

        </SolutionLayout>
    );
  }
}

/*export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">

    </SolutionLayout>
  );
};*/
