class Anticipation{

    /*
    整个预处理，存指令，存数据
     */
    static anticipation(str,ram){
        ram = this.store_instruction(str,ram);
        ram = this.dataSegment(str,ram);
        ram = this.stackSegment(str,ram);
        return ram;
    }

    /*
    数据段定义的处理
     */
    static dataSegment(str,ram){
        str = this.getSegment(str,this.getSegmentName(str,'DS'));
        for(let i=0;i<str.length;i++){
            if(str[i][1]==='DB'){
                ram.db_variable = new Map([[str[i][0],ram.ram_num]]);
                if(str[i][3].slice(0,3)==='DUP'){
                    if(str[i][3].slice(4,str[i][3].length-1) === '?'){
                        for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                            ram.ramList = new Map([[ram.ram_num,null]]);
                            ram.ram_num++;
                        }
                    } else {
                        for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                            ram.ramList = new Map([[ram.ram_num,SysConvert.to_decimal(str[i][3].slice(4,str[i][3].length-1))]]);
                            ram.ram_num++;
                        }
                    }
                }else {
                    for(let j=2;j<str[i].length;j++){
                        ram.ramList = str[i][j]==='?' ? new Map([[ram.ram_num,null]]):new Map([[ram_num,SysConvert.to_hexadecimal(str[i][j])]]);
                        ram.ram_num++;
                    }
                }
            }
            else if(str[i][1]==='DW'){
                ram.dw_variable = new Map([[str[i][0],ram.ram_num]]);
                if(str[i][3].slice(0,3)==='DUP'){
                    if(str[i][3].slice(4,str[i][3].length-1) === '?'){
                        for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                            ram.ramList = new Map([[ram.ram_num,null]]);
                            ram.ram_num++;
                            ram.ramList = new Map([[ram.ram_num,null]]);
                            ram.ram_num++;
                        }
                    } else {
                        for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                            let h = Math.floor(SysConvert.to_decimal(str[i][3].slice(4,str[i][3].length-1))/256);
                            let l = SysConvert.to_decimal(str[i][3].slice(4,str[i][3].length-1))%256;
                            ram.ramList = new Map([[ram.ram_num,l]]);
                            ram.ram_num++;
                            ram.ramList = new Map([[ram.ram_num,h]]);
                            ram.ram_num++;
                        }
                    }
                }else {
                    for(let j=2;j<str[i].length;j++){
                        if(str[i][j]==='?'){
                            ram.ramList = new Map([[ram.ram_num,null]]);
                            ram.ram_num++;
                            ram.ramList = new Map([[ram.ram_num,null]]);
                            ram.ram_num++;
                        }else{
                            let h = Math.floor(SysConvert.to_decimal(str[i][j])/256);
                            let l = SysConvert.to_decimal(str[i][j])%256;
                            ram.ramList = new Map([[ram.ram_num,l]]);
                            ram.ram_num++;
                            ram.ramList = new Map([[ram.ram_num,h]]);
                            ram.ram_num++;
                        }
                    }
                }
            }
        }
        return ram;
    }

    /*
    堆栈段定义的处理
     */
    static stackSegment(str,ram){
        str = this.getSegment(str,this.getSegmentName(str,'SS'));
        for(let i=0;i<str.length;i++){
            if(str[i][0]==='DB'){
                ram.db_variable = new Map([['STACK',ram.ram_num]]);
                if(str[i][2].slice(0,3)==='DUP'){
                    if(str[i][2].slice(4,str[i][2].length-1) === '?'){
                        for(let j=0;j<SysConvert.to_decimal(str[i][1]);j++){
                            ram.ramList = new Map([[ram.ram_num,null]]);
                            ram.ram_num++;
                        }
                    } else {
                        for(let j=0;j<SysConvert.to_decimal(str[i][1]);j++){
                            ram.ramList = new Map([[ram.ram_num,SysConvert.to_decimal(str[i][2].slice(4,str[i][2].length-1))]]);
                            ram.ram_num++;
                        }
                    }
                }else {
                    for(let j=1;j<str[i].length;j++){
                        ram.ramList = str[i][j]==='?' ? new Map([[ram.ram_num,null]]):new Map([[ram.ram_num,SysConvert.to_hexadecimal(str[i][j])]]);
                        ram.ram_num++;
                    }
                }
            }
            else if(str[i][0]==='DW'){
                ram.dw_variable = new Map([['STACK',ram.ram_num]]);
                if(str[i][2].slice(0,3)==='DUP'){
                    if(str[i][2].slice(4,str[i][2].length-1) === '?'){
                        for(let j=0;j<SysConvert.to_decimal(str[i][1]);j++){
                            ram.ramList = new Map([[ram.ram_num,null]]);
                            ram.ram_num++;
                            ram.ramList = new Map([[ram.ram_num,null]]);
                            ram.ram_num++;
                        }
                    } else {
                        for(let j=0;j<SysConvert.to_decimal(str[i][1]);j++){
                            let h = Math.floor(SysConvert.to_decimal(str[i][2].slice(4,str[i][2].length-1))/256);
                            let l = SysConvert.to_decimal(str[i][2].slice(4,str[i][2].length-1))%256;
                            ram.ramList = new Map([[ram.ram_num,l]]);
                            ram.ram_num++;
                            ram.ramList = new Map([[ram.ram_num,h]]);
                            ram.ram_num++;
                        }
                    }
                }else {
                    for(let j=1;j<str[i].length;j++){
                        if(str[i][j]==='?'){
                            ram.ramList = new Map([[ram.ram_num,null]]);
                            ram.ram_num++;
                            ram.ramList = new Map([[ram.ram_num,null]]);
                            ram.ram_num++;
                        }else{
                            let h = Math.floor(SysConvert.to_decimal(str[i][j])/256);
                            let l = SysConvert.to_decimal(str[i][j])%256;
                            ram.ramList = new Map([[ram.ram_num,l]]);
                            ram.ram_num++;
                            ram.ramList = new Map([[ram.ram_num,h]]);
                            ram.ram_num++;
                        }
                    }
                }
            }
        }
        return ram;
    }

    /*
    代码段的处理，存指令
     */
    static store_instruction(str,ram){
        str = this.getSegment(str,this.getSegmentName(str,'CS'));
        for(let i=0;i<str.length;i++){
            if(str[i][0].charAt(str[i][0].length-1)===':'){
                let label = str[i][0].replace(":","");
                ram.label_variable = new Map([label,ram.ram_num]);
                str[i] = str[i].slice(1,length);
            }
            ram = new Map([[ram.ram_num,str[i]]]);
            if(str[i].length===1){
                ram.ram_num++;
            }else if(str[i].length ===2){
                ram.ram_num+=2;
            }else {
                ram.ram_num+=3;
            }
        }
        return ram;
    }

    static subroutine(str){

    }
    static getSegment(str,segmentName){     //得到指定段的内容
        str = str.separate_wholeCode(str);
        for(let i=0;i<str.length;i++) {
            if(str[i][0] === segmentName && str[i][1] === "SEGMENT"){
                for(let j=i+1;j<str.length;j++){
                    if(str[j][0] === "ASSUME") i=j;
                    if(str[j][0] === segmentName && str[j][1] === "ENDS"){
                        return str.slice(i+1,j);
                    }
                }
            }
        }
    }

    static getSegmentName(str,regName){    //得到指定段对应的段名
        str = str.separate_wholeCode(str);
        for(let i=0;i<str.length;i++){
            if(str[i][0] === "ASSUME"){
                if(str[i][1].slice(0,2)===regName)
                    return str[i][2];
                else if(str[i][3].slice(0,2)===regName)
                    return str[i][4];
                else if(str[i][5].slice(0,2)===regName)
                    return str[i][6];
            }
        }
    }

    static separate_singleCode(str){    //单行代码的单词分割
        str = this.clear_note(str);
        str = str.trim();
        for(let i=0;i<str.length;i++){
            if(str.charAt(i)===':'){
                str = this.insertStr(str,i+1,' ');
            }
        }
        str = str.replace(","," ");
        str = str.split(" ");
        let len=0;
        let endStr = Array();
        for(let i=0;i<str.length;i++) {
            if (str[i] !== "") {
                endStr[len] = str[i];
                len++;
            }
        }
        return endStr;
    }

    static separate_wholeCode(str){      //整行代码的单词分割
        let endStr = Array(),len=0;
        for(let i=0;i<str.length;i++){
            if(this.separate_singleCode(str[i]).length === 0) continue;
            endStr[len]=this.separate_singleCode(str[i]);
            len++;
        }
        return endStr;
    }

    static clear_note(str){    //清除单行代码的注释
        for(let i=0;i<str.length;i++) {
            if(str[i]===';'){
                str = str.slice(0,i);  break;
            }
        }
        return str;
    }

    static insertStr(str, start, newStr){       //在字符串中特定位置插入字符
        return str.slice(0, start) + newStr + str.slice(start);
    }
}

let a= ["     ORG 3000H; 123   ","   MAIN   :   MOV   A   ,01H,   #01H  ;1234  ",   " MOV A  ,#01H  ;  123  ","  CLR C; 位修改  ","   END  ; 12345  "];
