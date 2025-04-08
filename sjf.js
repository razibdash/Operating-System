function sjfScheduling(processes) {
    let n = processes.length;
    let currentTime = 0;
    let completed = 0;
    let isVisited = new Array(n).fill(false);
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
  
    while (completed !== n) {
      let idx = -1;
      let minBurst = Infinity;
  
      // Find process with shortest burst time that has arrived
      for (let i = 0; i < n; i++) {
        if (
          processes[i].arrivalTime <= currentTime &&
          !isVisited[i] &&
          processes[i].burstTime < minBurst
        ) {
          minBurst = processes[i].burstTime;
          idx = i;
        }
      }
  
      if (idx !== -1) {
        let p = processes[idx];
        p.startTime = currentTime;
        p.completionTime = currentTime + p.burstTime;
        p.turnaroundTime = p.completionTime - p.arrivalTime;
        p.waitingTime = p.startTime - p.arrivalTime;
  
        totalWaitingTime += p.waitingTime;
        totalTurnaroundTime += p.turnaroundTime;
  
        isVisited[idx] = true;
        currentTime = p.completionTime;
        completed++;
      } else {
        currentTime++; // If no process is available, advance time
      }
    }
  
    // Output results
    console.log("PID\tArrival\tBurst\tStart\tCompletion\tWaiting\tTurnaround");
    processes.forEach((p) => {
      console.log(`${p.pid}\t${p.arrivalTime}\t${p.burstTime}\t${p.startTime}\t${p.completionTime}\t\t${p.waitingTime}\t${p.turnaroundTime}`);
    });
  
    console.log(`\nAverage Waiting Time: ${(totalWaitingTime / n).toFixed(2)}`);
    console.log(`Average Turnaround Time: ${(totalTurnaroundTime / n).toFixed(2)}`);
  }
  
  // Example usage
  const processes = [
    { pid: 1, arrivalTime: 0, burstTime: 7 },
    { pid: 2, arrivalTime: 2, burstTime: 4 },
    { pid: 3, arrivalTime: 4, burstTime: 1 },
    { pid: 4, arrivalTime: 5, burstTime: 4 }
  ];
  
  sjfScheduling(processes);
  