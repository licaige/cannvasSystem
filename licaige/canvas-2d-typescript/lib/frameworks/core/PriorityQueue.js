export class PriorityQueue extends Array {
    constructor(comparator) {
        super();
        this.comparator = comparator;
    }
    push(data) {
        let ret = super.push(data);
        let curr = this.length - 1;
        while (curr > 0) {
            let prev = (curr - 1) >> 1;
            if (this.comparator(this[curr], this[prev]) > 0) {
                this.swap(curr, prev);
            }
            else {
                break;
            }
            curr = prev;
        }
        return ret;
    }
    pop() {
        if (this.length === 0) {
            return undefined;
        }
        let value = this[0]; // 获取队首元素
        if (this.length > 1) {
            this.swap(0, this.length - 1); // 将最右端的叶子结点同队首元素调换
            this.splice(this.length - 1, 1); // 将原来的队首元素从队列删除
            this.maxHeapify(0); // 调整队列使其保持最大堆
        }
        else {
            this.splice(0, 1);
        }
        return value;
    }
    isEmpty() {
        return this.length == 0;
    }
    swap(i, j) {
        let temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    maxHeapify(index) {
        while (index < this.length) {
            let l = (index << 1) + 1; // 左孩子坐标
            let r = (index << 1) + 2; // 右孩子坐标
            if (l >= this.length)
                break;
            let larger; // 左右孩子优先级较高的下标
            if (r < this.length) {
                // 防止索引越界:避免比较函数写的不够鲁棒导致边界值不准确
                larger = this.comparator(this[l], this[r]) > 0 ? l : r;
            }
            else {
                larger = l;
            }
            if (this.comparator(this[larger], this[index]) > 0) {
                this.swap(index, larger);
                index = larger;
            }
            else {
                break;
            }
        }
    }
}
//# sourceMappingURL=PriorityQueue.js.map