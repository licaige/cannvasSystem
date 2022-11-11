import { Queue } from './Queue';
export declare class PriorityQueue<T> extends Array<T> implements Queue<T> {
    private comparator;
    constructor(comparator: (a: T, b: T) => number);
    push(data: T): number;
    pop(): T;
    isEmpty(): boolean;
    private swap;
    private maxHeapify;
}
//# sourceMappingURL=PriorityQueue.d.ts.map