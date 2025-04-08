class Process {
    constructor(pid, arrivalTime, burstTime, priority) {
      this.pid = pid;               // Process ID
      this.arrivalTime = arrivalTime; // Time when process arrives
      this.burstTime = burstTime;    // CPU time required by process
      this.priority = priority;      // Priority (lower number = higher priority)
      this.waitingTime = 0;          // Time spent waiting
      this.turnaroundTime = 0;       // Total time from arrival to completion
      this.completionTime = 0;       // Time when process completes
      this.remainingTime = burstTime; // Remaining burst time
    }
  }
  
  function priorityScheduling(processes) {
    let currentTime = 0;
    let completed = 0;
    const n = processes.length;
    const results = [];
    
    // Create a copy of processes to avoid modifying the original array
    const processQueue = processes.map(p => new Process(
      p.pid, p.arrivalTime, p.burstTime, p.priority
    ));
    
    while (completed < n) {
      // Filter processes that have arrived and have remaining burst time
      const arrivedProcesses = processQueue.filter(
        p => p.arrivalTime <= currentTime && p.remainingTime > 0
      );
      
      if (arrivedProcesses.length === 0) {
        currentTime++;
        continue;
      }
      
      // Sort by priority (lower number = higher priority)
      arrivedProcesses.sort((a, b) => a.priority - b.priority);
      
      const currentProcess = arrivedProcesses[0];
      
      // Execute the process (non-preemptive)
      currentTime += currentProcess.remainingTime;
      currentProcess.remainingTime = 0;
      completed++;
      
      // Calculate process metrics
      currentProcess.completionTime = currentTime;
      currentProcess.turnaroundTime = currentProcess.completionTime - currentProcess.arrivalTime;
      currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
      
      results.push(currentProcess);
    }
    
    return results;
  }
  
  // Example usage
  const processes = [
    new Process(1, 0, 10, 3),
    new Process(2, 0, 5, 1),
    new Process(3, 2, 8, 4),
    new Process(4, 3, 3, 2)
  ];
  
  const scheduledProcesses = priorityScheduling(processes);
  
  console.log("PID\tPriority\tArrival\tBurst\tCompletion\tWaiting\tTurnaround");
  scheduledProcesses.forEach(p => {
    console.log(`${p.pid}\t${p.priority}\t\t${p.arrivalTime}\t${p.burstTime}\t${p.completionTime}\t\t${p.waitingTime}\t${p.turnaroundTime}`);
  });
  
  // Calculate averages
  const avgWaiting = scheduledProcesses.reduce((sum, p) => sum + p.waitingTime, 0) / scheduledProcesses.length;
  const avgTurnaround = scheduledProcesses.reduce((sum, p) => sum + p.turnaroundTime, 0) / scheduledProcesses.length;
  
  console.log(`\nAverage Waiting Time: ${avgWaiting.toFixed(2)}`);
  console.log(`Average Turnaround Time: ${avgTurnaround.toFixed(2)}`);