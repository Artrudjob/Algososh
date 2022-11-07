export interface INode<T> {
    value: T;
    next: LinkedListNode<T> | null;
}

export default class LinkedListNode<T> implements INode<T> {
    constructor(
        public value: T,
        public next: LinkedListNode<T> | null
    ) {
        this.value = value;
        this.next = next;
    }
}
