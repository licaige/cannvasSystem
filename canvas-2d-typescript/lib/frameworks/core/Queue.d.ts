export interface Queue<T> {
    push(data: T): number;
    pop(): T;
    readonly length: number;
    isEmpty(): boolean;
}
//# sourceMappingURL=Queue.d.ts.map