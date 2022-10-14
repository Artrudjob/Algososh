export function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}