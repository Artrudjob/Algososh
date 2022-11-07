import LinkedListNode from "./linkedListNode";

interface INodeList<T> {
    head: LinkedListNode<T> | null;
    tail: LinkedListNode<T> | null;
}

export default class LinkedList<T> implements INodeList<T> {
    public head: LinkedListNode<T> | null = null;
    public tail: LinkedListNode<T> | null = null;
    constructor(values?: T[]) {
            if (values?.length) {
                this.appendFromArray(values)
            }
    }

    private appendFromArray(values: T[]) {
        values.forEach((value) => this.append(value));
    }

    prepend(item: T): LinkedList<T> {
        const newNode = new LinkedListNode(item, this.head);

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(item: T): LinkedList<T> {
        const newNode = new LinkedListNode(item, null);

        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    addByIndex(item: T, index: number) {
        const nodesLength = this.toArray().length;

        if (index < 0) {
            throw new Error("Введенное значение не может быть отрицательным");
        } else if (index > nodesLength) {
            throw new Error("Введенное значение не должны быть больше, чем количество узлов");
        } else {
            if (index === 0) {
                this.prepend(item);
            } else {
                const newNode = new LinkedListNode(item, null);
                let currentNode: LinkedListNode<T> | null = this.head;
                let previousNode;
                let count = 0;

                while (count < index && currentNode) {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                    count++;
                }

                if (previousNode) {
                    previousNode.next = newNode;
                    newNode.next = currentNode;
                }
            }
            return this;
        }
    }

    deleteByIndex(index: number) {
        if (!this.head) {
            return null;
        }

        const nodesLength = this.toArray().length;

        if (index < 0) {
            throw new Error("Введенное значение не может быть отрицательным");
        } else if (index > nodesLength) {
            throw new Error("Введенное значение не должны быть больше, чем количество узлов");
        } else {
            if (index === 0) {
                this.deleteHead()
            } else {
                let deletedNode;
                let count = 1;
                let currentNode: LinkedListNode<T> | null = this.head;

                while (this.head && index === 0) {
                    deletedNode = this.head;

                    this.head = this.head.next;
                }

                if (currentNode !== null) {
                    while (currentNode.next) {
                        if (count === index) {
                            deletedNode = currentNode.next;
                            currentNode.next = currentNode.next.next;
                        } else {
                            currentNode = currentNode.next;
                        }
                        count++;
                    }
                }

                if (this.tail && index === nodesLength - 1) {
                    this.tail = currentNode;
                }

                return deletedNode;
            }
        }
    }

    deleteHead(): LinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    deleteTail(): LinkedListNode<T> | null {
        if (!this.tail) {
            return null;
        }

        const deletedTail = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        let currentNode = this.head;
        while (currentNode && currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    toArray(): LinkedListNode<T>[] {
        const nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }
}