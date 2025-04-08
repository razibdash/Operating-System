
class BankersAlgorithm{
    constructor(processes,resourse,available,max,allocation){
        this.processes=processes,
        this.resourse=resourse,
        this.available=available,
        this.max=max,
        this.allocation=allocation,
        this.need=calculateNeed();
    }

    calculateNeed(){
        let need=[];
        for(let i=0;i<this.processes;i++){
            need[i]=[];
            for(let j=0;j<this.resourse;j++){
                need[i][j]=this.max[i][j]-this.allocation[i][j];
            }
        }
        return need;
    }
    canAllocated(processesIndex,work){
        for(let j=0;j<this.resourse;j++){
            if(this.need[processesIndex][j]>work[j]){
                return false;
            }
        }
        return true;
    }

    isSafe(){
        let work=[...this.available];
        let finish=new Array(this.processes).fill(false);
        let safeSequence=[];
        while(true){
            found=false;
            
        }

    }
}