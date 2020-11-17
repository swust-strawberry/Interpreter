let ram_num = 256;
let db_variable = new Map();
let dw_variable = new Map();
let label_variable = new Map();
class Anticipation{

    static pseudo_instruction(str,ram){
        str = this.getSegment(str,this.getSegmentName(str,'DS'));
        for(let i=0;i<str.length;i++){
            if(str[i][1]==='DB'){
                db_variable = new Map([[str[i][0],ram_num]]);
                if(str[i][3].slice(0,3)==='DUP'){
                    if(str[i][3].slice(4,str[i][3].length-1) === '?'){
                        for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                            ram = new Map([[ram_num,null]]);
                            ram_num++;
                        }
                    } else {
                        for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                            ram = new Map([[ram_num,SysConvert.to_decimal(str[i][3].slice(4,str[i][3].length-1))]]);
                            ram_num++;
                        }
                    }
                }else {
                    for(let j=2;j<str[i].length;j++){
                        ram = str[i][j]==='?' ? new Map([[ram_num,null]]):new Map([[ram_num,SysConvert.to_hexadecimal(str[i][j])]]);
                        ram_num++;
                    }
                }
            }
            else if(str[i][1]==='DW'){
                dw_variable = new Map([[str[i][0],ram_num]]);
                if(str[i][3].slice(0,3)==='DUP'){
                    if(str[i][3].slice(4,str[i][3].length-1) === '?'){
                        for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                            ram = new Map([[ram_num,null]]);
                            ram_num++;
                            ram = new Map([[ram_num,null]]);
                            ram_num++;
                        }
                    } else {
                        for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                            let h = Math.floor(SysConvert.to_decimal(str[i][3].slice(4,str[i][3].length-1))/256);
                            let l = SysConvert.to_decimal(str[i][3].slice(4,str[i][3].length-1))%256;
                            ram = new Map([[ram_num,l]]);
                            ram_num++;
                            ram = new Map([[ram_num,h]]);
                            ram_num++;
                        }
                    }
                }else {
                    for(let j=2;j<str[i].length;j++){
                        if(str[i][j]==='?'){
                            ram = new Map([[ram_num,null]]);
                            ram_num++;
                            ram = new Map([[ram_num,null]]);
                            ram_num++;
                        }else{
                            let h = Math.floor(SysConvert.to_decimal(str[i][j])/256);
                            let l = SysConvert.to_decimal(str[i][j])%256;
                            ram = new Map([[ram_num,l]]);
                            ram_num++;
                            ram = new Map([[ram_num,h]]);
                            ram_num++;
                        }
                    }
                }
            }
        }
    }

    static store_instruction(str){
        str = this.getSegment(str,this.getSegmentName(str,'CS'));
        for(let i=0;i<str.length;i++){
            if(str[i][0].charAt(str[i][0].length-1)===':'){
                let label = str[i][0].replace(":","");
                label_variable = new Map([label,ram_num]);
            }
        }
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
