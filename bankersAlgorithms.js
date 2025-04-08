class BankersAlgorithm {
    constructor(processes, resources, available, max, allocation) {
        this.processes = processes;
        this.resources = resources;
        this.available = available;
        this.max = max;
        this.allocation = allocation;
        this.need = this.calculateNeed();
    }

    calculateNeed() {
        const need = [];
        for (let i = 0; i < this.processes; i++) {
            need[i] = [];
            for (let j = 0; j < this.resources; j++) {
                need[i][j] = this.max[i][j] - this.allocation[i][j];
            }
        }
        return need;
    }

    isSafe() {
        const work = [...this.available];
        const finish = new Array(this.processes).fill(false);
        const safeSequence = [];

        while (true) {
            let found = false;
            for (let i = 0; i < this.processes; i++) {
                if (!finish[i] && this.canAllocate(i, work)) {
                    for (let j = 0; j < this.resources; j++) {
                        work[j] += this.allocation[i][j];
                    }
                    safeSequence.push(i);
                    finish[i] = true;
                    found = true;
                }
            }

            if (!found) {
                break;
            }
        }

        if (safeSequence.length === this.processes) {
            console.log("System is in a safe state.");
            console.log("Safe sequence:", safeSequence);
            return true;
        } else {
            console.log("System is not in a safe state.");
            return false;
        }
    }

    canAllocate(processIndex, work) {
        for (let j = 0; j < this.resources; j++) {
            if (this.need[processIndex][j] > work[j]) {
                return false;
            }
        }
        return true;
    }
}

// Example usage:
const processes = 5;
const resources = 3;

const available = [3, 3, 2];

const max = [
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3]   
];

const allocation = [
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
];

const banker = new BankersAlgorithm(processes, resources, available, max, allocation);
banker.isSafe();