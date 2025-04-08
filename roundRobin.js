function roundRobin(processes, quantum) {
    let time = 0;
    let queue = [...processes]; // Create a copy of the processes array
    let results = [];
    
    while (queue.length > 0) {
        const currentProcess = queue.shift(); // Get the first process in the queue
        
        // Execute the process for the quantum or its remaining time (whichever is smaller)
        const executionTime = Math.min(currentProcess.burstTime, quantum);
        
        // Record the execution
        results.push({
            processId: currentProcess.id,
            startTime: time,
            endTime: time + executionTime,
            remainingTime: currentProcess.burstTime - executionTime
        });
        
        time += executionTime;
        currentProcess.burstTime -= executionTime;
        
        // If the process still has burst time left, add it back to the queue
        if (currentProcess.burstTime > 0) {
            queue.push(currentProcess);
        }
    }
    
    return results;
}

// Example usage:
const processes = [
    { id: 'P1', burstTime: 10 },
    { id: 'P2', burstTime: 5 },
    { id: 'P3', burstTime: 8 }
];

const quantum = 3;
const schedule = roundRobin(processes, quantum);

console.log("Round Robin Schedule:");
schedule.forEach(entry => {
    console.log(`Process ${entry.processId} executed from ${entry.startTime} to ${entry.endTime}`);
});