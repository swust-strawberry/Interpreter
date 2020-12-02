class Anticipation{

    /*
    整个预处理，存指令，存数据
     */
    static anticipation(str,ram){
        ram = this.foundStart(str,ram);
        ram = this.store_instruction(str,ram);
        ram = this.dataSegment(str,ram);
        ram = this.stackSegment(str,ram);
        ram.setSegList('ES',this.fullZero(SysConvert.to_hexadecimal(Math.floor(ram.getRam_num()/16))+'H',4));
        ram.setSegName('ES','ES');
        return ram;
    }

    static foundStart(str,ram){    //程序的起始标号名
        str = this.separate_wholeCode(str);
        for(let i=0;i<str.length;i++){
            if(str[i][0]==='END'){
                if(str[i][1]){
                    ram.setStart(str[i][1]);
                    break;
                }
            }
        }
        return ram;
    }
    /*
    数据段定义的处理
     */
    static dataSegment(str,ram){
        ram.setSegList(this.getSegmentName(str,'DS'),this.fullZero(SysConvert.to_hexadecimal(Math.floor(ram.getRam_num()/16))+'H',4));
        ram.setSegName('DS',this.getSegmentName(str,'DS'));
        str = this.getSegment(str,this.getSegmentName(str,'DS'));
        for(let i=0;i<str.length;i++){
            if(str[i][0]==='ORG'){
                ram.setRam_num(SysConvert.to_decimal(str[i][1])*16);
            }
            if(str[i][1]==='DB'){
                ram.setDbVariable(str[i][0],ram.getRam_num());
                if(str[i][3]){
                    if(str[i][3].slice(0,3)==='DUP'){
                        if(str[i][3].slice(4,str[i][3].length-1) === '?'){
                            for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                                ram.setRam(ram.getRam_num(),null);
                                let num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                            }
                        } else {
                            for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                                ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(str[i][3].slice(4,str[i][3].length-1))+'H',2));
                                let num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                            }
                        }
                    }
                }
                else {
                    for(let j=2;j<str[i].length;j++){
                        str[i][j]==='?' ? ram.setRam(ram.getRam_num(),null):ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(str[i][j])+'H',2));
                        let num = ram.getRam_num() + 1;
                        ram.setRam_num(num);
                    }
                }
            }
            else if(str[i][1]==='DW'){
                ram.setDwVariable(str[i][0],ram.getRam_num());
                if(str[i][3]){
                    if(str[i][3].slice(0,3)==='DUP'){
                        if(str[i][3].slice(4,str[i][3].length-1) === '?'){
                            for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                                ram.setRam(ram.getRam_num(),null);
                                let num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                                ram.setRam(ram.getRam_num(),null);
                                num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                            }
                        } else {
                            for(let j=0;j<SysConvert.to_decimal(str[i][2]);j++){
                                let h = Math.floor(SysConvert.to_decimal(str[i][3].slice(4,str[i][3].length-1))/256);
                                let l = SysConvert.to_decimal(str[i][3].slice(4,str[i][3].length-1))%256;
                                ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(l)+'H',2));
                                let num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                                ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(h)+'H',2));
                                num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                            }
                        }
                    }
                }
                else {
                    for(let j=2;j<str[i].length;j++){
                        if(str[i][j]==='?'){
                            ram.setRam(ram.getRam_num(),null);
                            let num = ram.getRam_num() + 1;
                            ram.setRam_num(num);
                            ram.setRam(ram.getRam_num(),null);
                            num = ram.getRam_num() + 1;
                            ram.setRam_num(num);
                        }else{
                            let h = Math.floor(SysConvert.to_decimal(str[i][j])/256);
                            let l = SysConvert.to_decimal(str[i][j])%256;
                            ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(l)+'H',2));
                            let num = ram.getRam_num() + 1;
                            ram.setRam_num(num);
                            ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(h)+'H',2));
                            num = ram.getRam_num() + 1;
                            ram.setRam_num(num);
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
        ram.setSegList(this.getSegmentName(str,'SS'),this.fullZero(SysConvert.to_hexadecimal(Math.floor(ram.getRam_num()/16))+'H',4));
        ram.setSegName('SS',this.getSegmentName(str,'SS'));
        str = this.getSegment(str,this.getSegmentName(str,'SS'));
        for(let i=0;i<str.length;i++){
            if(str[i][0]==='ORG'){
                ram.getRam_num(SysConvert.to_decimal(str[i][1])*16);
            }
            if(str[i][0]==='DB'){
                ram.setDbVariable('STACK',ram.getRam_num());
                if(str[i][2]){
                    if(str[i][2].slice(0,3)==='DUP'){
                        if(str[i][2].slice(4,str[i][2].length-1) === '?'){
                            for(let j=0;j<SysConvert.to_decimal(str[i][1]);j++){
                                ram.setRam(ram.getRam_num(),null);
                                let num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                            }
                        } else {
                            for(let j=0;j<SysConvert.to_decimal(str[i][1]);j++){
                                ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(str[i][2].slice(4,str[i][2].length-1))+'H',2));
                                let num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                            }
                        }
                    }
                } else {
                    for(let j=1;j<str[i].length;j++){
                        str[i][j]==='?' ? ram.setRam(ram.getRam_num(),null):ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(str[i][j])+'H',2));
                        let num = ram.getRam_num() + 1;
                        ram.setRam_num(num);
                    }
                }
            }
            else if(str[i][0]==='DW'){
                ram.setDwVariable('STACK',ram.getRam_num());
                if(str[i][2]){
                    if(str[i][2].slice(0,3)==='DUP'){
                        if(str[i][2].slice(4,str[i][2].length-1) === '?'){
                            for(let j=0;j<SysConvert.to_decimal(str[i][1]);j++){
                                ram.setRam(ram.getRam_num(),null);
                                let num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                                ram.setRam(ram.getRam_num(),null);
                                num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                            }
                        } else {
                            for(let j=0;j<SysConvert.to_decimal(str[i][1]);j++){
                                let h = Math.floor(SysConvert.to_decimal(str[i][2].slice(4,str[i][2].length-1))/256);
                                let l = SysConvert.to_decimal(str[i][2].slice(4,str[i][2].length-1))%256;
                                ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(l)+'H',2));
                                let num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                                ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(h)+'H',2));
                                num = ram.getRam_num() + 1;
                                ram.setRam_num(num);
                            }
                        }
                    }
                } else {
                    for(let j=1;j<str[i].length;j++){
                        if(str[i][j]==='?'){
                            ram.setRam(ram.getRam_num(),null);
                            let num = ram.getRam_num() + 1;
                            ram.setRam_num(num);
                            ram.setRam(ram.getRam_num(),null);
                            num = ram.getRam_num() + 1;
                            ram.setRam_num(num);
                        }else{
                            let h = Math.floor(SysConvert.to_decimal(str[i][j])/256);
                            let l = SysConvert.to_decimal(str[i][j])%256;
                            ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(l)+'H',2));
                            let num = ram.getRam_num() + 1;
                            ram.setRam_num(num);
                            ram.setRam(ram.getRam_num(),this.fullZero(SysConvert.to_hexadecimal(h)+'H',2));
                            num = ram.getRam_num() + 1;
                            ram.setRam_num(num);
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
        ram.setSegList(this.getSegmentName(str,'CS'),this.fullZero(SysConvert.to_hexadecimal(Math.floor(ram.getRam_num()/16))+'H',4));
        ram.setSegName('CS',this.getSegmentName(str,'CS'));
        str = this.getSegment(str,this.getSegmentName(str,'CS'));
        for(let i=0;i<str.length;i++){
            if(str[i][0]==='ORG'){
                ram.setRam_num(SysConvert.to_decimal(str[i][1])*16);
            }
            if(str[i][0].charAt(str[i][0].length-1)===':'){
                let label = str[i][0].replace(":","");
                ram.setLabelVariable(label,ram.getRam_num());
                let endStr = [];
                for(let j=1;j<str[i].length;j++){
                    endStr[j-1] = str[i][j];
                }
                str[i] = endStr;
            }
            if(str[i][1]==='PROC'){
                ram.setProcedureNameList(str[i][0],ram.getRam_num());
                    continue;
            }
            if(str[i][1]==='ENDP'){
                continue;
            }
            ram.setRam(ram.getRam_num(),str[i]);
            let num = ram.getRam_num() + this.instructionByte(str[i]);
            ram.setRam_num(num);
        }
        return ram;
    }

    static getSegment(str,segmentName){     //得到指定段的内容
        str = this.separate_wholeCode(str);
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
        str = this.separate_wholeCode(str);
        for(let i=0;i<str.length;i++){
            if(str[i][0] === "ASSUME"){
                if(str[i][1].slice(0,2)===regName)
                    return str[i][2];
                else if(str[i][3].slice(0,2)===regName)
                    return str[i][4];
                else if(str[i][5].slice(0,2)===regName)
                    return str[i][6];
                else if(str[i][7].slice(0,2)===regName)
                    return str[i][8];
            }
        }
    }

    static separate_singleCode(str){    //单行代码的单词分割
        str = this.clear_note(str);
        str = str.trim();
        for(let i=0;i<str.length;i++){
            if(str.charAt(i) ===':'){
                str = this.insertStr(str,i+1,' ');
            }
        }
        str = str.replace(/,/g," ");
        str = str.split(" ");
        let midLen=0;
        let midStr = [];
        for(let i=0;i<str.length;i++) {
            if (str[i] !== "") {
                midStr[midLen] = str[i];
                midLen++;
            }
        }
        let endLen = 0;
        let endStr = [];
        if(midStr[0]!=='ASSUME'){
            endStr[endLen] = midStr[0];
            endLen++;
            for(let i=1;i<midStr.length;i++){
                if(midStr[i].charAt(midStr[i].length-1)===':'){
                    endStr[endLen] = midStr[i]+midStr[i+1];
                    i++;
                }else{
                    endStr[endLen] = midStr[i];
                }
                endLen++;
            }
        }else{
            endStr = midStr;
        }
        return endStr;
    }

    static separate_wholeCode(str){      //整行代码的单词分割
        let endStr = [],len=0;
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

    static fullZero(str,num){
        let n = str.length
        for(let i=0;i<=num-n;i++){
            str = '0' + str;
        }
        return str;
    }

    static instructionByte(str){
        let n=0;
        if(str.length ===2){
            if(str[1].indexOf('[')){
                if(Addressing_mode.byte(str[1])===1 || Addressing_mode.byte(str[1])===3 ||Addressing_mode.byte(str[1])===5 ){
                    n++;
                }
            }
            n++;
        }
        if (str.length ===3){
            if(str[1].indexOf('[')!==-1 || str[2].indexOf('[')!==-1){
                if((Addressing_mode.byte(str[1])===1) || (Addressing_mode.byte(str[1])===3) ||(Addressing_mode.byte(str[1])===5)
                    || (Addressing_mode.byte(str[2])===1) || (Addressing_mode.byte(str[2])===3) ||(Addressing_mode.byte(str[2])===5)){
                    n++;
                }
            }else{
                if(!ram.chip.register.get(str[2])){
                    if(str[1].charAt(1) === 'H'|| str[1].charAt(1) === 'L'){
                        n++;
                    } else{
                        n+=2
                    }
                }
            }
        }
        n++;
        return n;
    }
}


