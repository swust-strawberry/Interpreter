class Anticipation{
    static get_code(str){
        for(let i=0;i<str.length;i++)
        {
            for()
        }
    }
    static separate(str){
        str = this.clear_note(str);
        for(let i=0;i<str.length;i++){
            Array[i] = this.clear_note(str[i]);

        }
        let w = Array;
        let flag1=0,flag2=0,flag3=0;
        str=str.trim();
        for(let j=0;j<str.length;j++){
            if(str.charAt(j)===':'){
                flag1=1;
                str=str.replace(":"," ");
            }else if(str.charAt(j)===';'){
                flag2=j;
                str=str.replace(";"," ");
            }else if(str.charAt(j)===','){
                flag3++;
                str=str.replace(","," ");
            }
        }
        let x = [];
        x = flag2!==0 ? str.slice(0,flag2) : str;
        x = x.split(" ");
        let n=0;
        let y = [];
        for(let j=0;j<x.length;j++) {
            if (x[j] !== "") {
                y[n] = x[j];
                n++;
            }
        }
        return flag1 ? y.slice(1, n) : y;
    }

    static clear_note(str){    //清除注释
        for(let i=0;i<str.length;i++) {
            for(let j=0;j<str[i].length;j++){
                str[i] = str[i][j]===';' ? str[i].slice(0,j) : str[i];
            }
        }
        return str;
    }
}
let label_list = new Map();
let command_list = [];
let a= ["     ORG 3000H; 123   ","   MAIN   :   MOV   A   ,01H,   #01H  ;1234  ",   " MOV A  ,#01H  ;  123  ","  CLR C; 位修改  ","   END  ; 12345  "];

console.table(command_list);