interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    clear(): void;
    size(): number;
}

export class Queue<T> implements IQueue<T> {
    private storage: T[] = [];

    enqueue(item: T) {
        this.storage.push(item);
    }

    dequeue(): T | undefined {
        if (this.storage.length === 0) {
            throw new Error("Очередь уже пуста");
        }
        return this.storage.shift();
    }

    clear(): void {
        this.storage.length = 0;
    }

    size(): number {
        return this.storage.length;
    }
}