// First-Come, First-Served (FCFS) Scheduling Algorithm Implementation in JavaScript

  function fcfsScheduling(processes) {
    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
  
    processes.forEach((p) => {
      if (currentTime < p.arrivalTime) {
        currentTime = p.arrivalTime;
      }
  
      p.startTime = currentTime;
      p.completionTime = currentTime + p.burstTime;
      p.turnaroundTime = p.completionTime - p.arrivalTime;
      p.waitingTime = p.startTime - p.arrivalTime;
  
      currentTime = p.completionTime;
  
      totalWaitingTime += p.waitingTime;
      totalTurnaroundTime += p.turnaroundTime;
    });
  
    console.log("PID\tArrival\tBurst\tStart\tCompletion\tWaiting\tTurnaround");
    processes.forEach((p) => {
      console.log(`${p.pid}\t${p.arrivalTime}\t${p.burstTime}\t${p.startTime}\t${p.completionTime}\t\t${p.waitingTime}\t${p.turnaroundTime}`);
    });
  
    console.log(`\nAverage Waiting Time: ${(totalWaitingTime / processes.length).toFixed(2)}`);
    console.log(`Average Turnaround Time: ${(totalTurnaroundTime / processes.length).toFixed(2)}`);
  }
  
  // Example input
  const processes = [
    { pid: 1, arrivalTime: 2, burstTime: 2 },
    { pid: 2, arrivalTime: 0, burstTime: 1 },
    { pid: 3, arrivalTime: 2, burstTime: 3 },
    { pid: 4, arrivalTime: 3, burstTime: 5 },
    { pid: 5, arrivalTime: 4, burstTime: 5 }
  ];
  
  
  fcfsScheduling(processes);
  