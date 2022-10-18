interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    clear(): void;
    size(): number;
}

export class Stack<T> implements IStack<T> {
    private storage: T[] = [];

    push(item: T) {
        this.storage.push(item);
    }

    pop(): T | undefined {
        if (this.storage.length === 0) {
            throw new Error("Стэк уже пуст");
        }
        return this.storage.pop()
    }

    clear(): void {
        this.storage.length = 0;
    }

    toArray() {
        return this.storage;
    }

    size(): number {
        return this.storage.length;
    }
}