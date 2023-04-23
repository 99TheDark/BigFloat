export class AssertionFailedError extends Error {
    private items: string[];

    constructor(a: string, b: string) {
        super(`${a} is not equal to ${b}.`);
        this.items = [a, b];
    }
}

export function assertEquals<T>(a: T, b: T) {
    if(a !== b) {
        throw new AssertionFailedError(String(a), String(b));
    }
}