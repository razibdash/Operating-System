class BankersAlgorithm {
    constructor(available, max, allocation) {
      this.available = available; // Available resources
      this.max = max;             // Maximum demand by each process
      this.allocation = allocation; // Currently allocated resources
      this.processCount = allocation.length;
      this.resourceCount = available.length;
    }
  
    // Calculate need matrix
    calculateNeed() {
      const need = [];
      for (let i = 0; i < this.processCount; i++) {
        need[i] = [];
        for (let j = 0; j < this.resourceCount; j++) {
          need[i][j] = this.max[i][j] - this.allocation[i][j];
        }
      }
      return need;
    }
  
    // Check if the system is in a safe state
    isSafe() {
      const need = this.calculateNeed();
      const work = [...this.available];
      const finish = new Array(this.processCount).fill(false);
      
      let safeSequence = [];
      let count = 0;
      
      while (count < this.processCount) {
        let found = false;
        
        for (let i = 0; i < this.processCount; i++) {
          if (!finish[i]) {
            let canAllocate = true;
            for (let j = 0; j < this.resourceCount; j++) {
              if (need[i][j] > work[j]) {
                canAllocate = false;
                break;
              }
            }
            
            if (canAllocate) {
              for (let j = 0; j < this.resourceCount; j++) {
                work[j] += this.allocation[i][j];
              }
              safeSequence.push(i);
              finish[i] = true;
              found = true;
              count++;
            }
          }
        }
        
        if (!found) {
          break; // No process found that can be allocated resources
        }
      }
      
      if (count === this.processCount) {
        return { safe: true, sequence: safeSequence };
      } else {
        return { safe: false };
      }
    }
  
    // Resource request algorithm
    resourceRequest(processId, request) {
      // Step 1: Check if request <= need
      const need = this.calculateNeed();
      for (let i = 0; i < this.resourceCount; i++) {
        if (request[i] > need[processId][i]) {
          return { granted: false, reason: "Request exceeds maximum need" };
        }
      }
      
      // Step 2: Check if request <= available
      for (let i = 0; i < this.resourceCount; i++) {
        if (request[i] > this.available[i]) {
          return { granted: false, reason: "Resources not available" };
        }
      }
      
      // Step 3: Pretend to allocate resources
      const oldAvailable = [...this.available];
      const oldAllocation = this.allocation.map(arr => [...arr]);
      
      for (let i = 0; i < this.resourceCount; i++) {
        this.available[i] -= request[i];
        this.allocation[processId][i] += request[i];
      }
      
      // Step 4: Check if the new state is safe
      const safetyCheck = this.isSafe();
      
      if (safetyCheck.safe) {
        return { granted: true, sequence: safetyCheck.sequence };
      } else {
        // Revert changes
        this.available = oldAvailable;
        this.allocation = oldAllocation;
        return { granted: false, reason: "Request would lead to unsafe state" };
      }
    }
  }
  
  // Example usage:
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
  
  const banker = new BankersAlgorithm(available, max, allocation);
  
  // Check initial state
  console.log("Initial safety check:", banker.isSafe());
  
  // Make a resource request
  const request = [1, 0, 2];
  const processId = 1;
  console.log(`Request from process ${processId}:`, request);
  console.log("Request result:", banker.resourceRequest(processId, request));