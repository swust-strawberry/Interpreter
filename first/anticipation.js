class Anticipation{
    separate(str){
        for(let i=0;i<str.length;i++){
            let flag1=0,flag2=0,flag3=0;
            str[i]=str[i].trim();
            for(let j=0;j<str[i].length;j++){
                if(str[i].charAt(j)===':'){
                    flag1=1;
                    str[i]=str[i].replace(":"," ");
                }
                else if(str[i].charAt(j)===';'){
                    flag2=j;
                    str[i]=str[i].replace(";"," ");
                }
                else if(str[i].charAt(j)===','){
                    flag3++;
                    str[i]=str[i].replace(","," ");
                }
            }
            let x = [];
            x = flag2!==0 ? str[i].slice(0,flag2) : str[i];
            x = x.split(" ");
            let n=0;
            let y = [];
            for(let j=0;j<x.length;j++) {
                if (x[j] !== "") {
                    y[n] = x[j];
                    n++;
                }
            }
            str[i] = flag1 ? y.slice(1,n) : y;
            flag1 ? label_list.set(y[0],i) : 1;
        }
    }

}
let label_list = new Map();
let command_list = [];
let a= ["     ORG 3000H; 123   ","   MAIN   :   MOV   A   ,01H,   #01H  ;1234  ",   " MOV A  ,#01H  ;  123  ","  CLR C; 位修改  ","   END  ; 12345  "];

console.table(command_list);