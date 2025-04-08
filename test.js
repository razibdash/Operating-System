class BankersAlgorithm{
    constructor(processor , resoouse,available,max,allocation){
            this.processor=processor,
            this.resoouse=resoouse,
            this.available=available,
            this.max=max,
            this.allocation=allocation
            this.need=this.calculateNeed();
    }
    calculateNeed(){
        let need=[];
        for(let i=0;i<this.processor;i++){
         need[i]=[];
         for(let j=0;j<this.resoouse;j++){
            need[i][j]=this.max[i][j]-this.allocation[i][j];

         }
        }
        return need;
    }
    isSafe(){
        const work=[...this.available];
        const finish=new Array(this.processor).fill(false);
        let safeSequence=[];

        while(true){
            let found=false;
            for(let i=0;i<this.processor;i++){
                if(!finish[i] && this.canAllocated(i,work)){
                    for(let j=0;j<this.resoouse;j++){
                        work[j]+=this.allocation[i][j];
                    }
                    safeSequence.push('P->'+i);
                    found=true;
                    finish[i]=true;
                }
            }

            if(!found){
                break;
            }
        }
        if(safeSequence.length===this.processor){
            console.log("this system is safe");
            console.log("The safe Sequence is : ",safeSequence);
            return true;
        }else{
        console.log("the system is not safe!");
        return false;
        }

    }
    canAllocated(processesIndex,work){
        for(let j=0;j<this.resoouse;j++){
            if(this.need[processesIndex][j]>work[j]){
                return false;
            }
        }
        return true;
    }
}

//main funtion 
const processes=5;
const resoouse=3;
const available=[3,3,,2];
const max=[
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3]
];

const allocation=[
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
]

const banker=new BankersAlgorithm(processes,resoouse,available,max,allocation)
banker.isSafe();
