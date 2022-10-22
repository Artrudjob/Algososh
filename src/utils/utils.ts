export function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function swap(arr: string[] | number[], firstIndex: number, secondIndex: number): void {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
}

export function getFibonacciNumbers(n: number): number[] {
    const arr: number[] = [1, 1];
    for (let i = 2; i < n + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1])
    }

    return arr
}