class Flags {//参数必须为十六进制的字符串，data1是原数，data2是运算结果数,num是原数转化为二进制的位数8或者16
    static judgeAllFlag(data1,data2,num,ram){
        ram.chip.setFlagByName('CF',Flags.judgeCf(data1,data2,num));
        ram.chip.setFlagByName('AF',Flags.judgeAf(data1,data2));
        ram.chip.setFlagByName('ZF',Flags.judgeZf(data2));
        ram.chip.setFlagByName('SF',Flags.judgeSf(data2));
        ram.chip.setFlagByName('OF',Flags.judgeOf(data1,data2));
        ram.chip.setFlagByName('PF',Flags.judgePf(data2));
        ram.chip.setFlagByName('DF',Flags.judgeDf());
        ram.chip.setFlagByName('IF',Flags.judgeIf());
        ram.chip.setFlagByName('TF',Flags.judgeTf());
        return ram;
    }
    static judgeCf(data1,data2,num){   //进位/借位标志。CF为0，最高位无进位/借位；CF为1，最高位有进位/借位
        if(data2<0){
            return '1';
        }else{
            if(Anticipation.fullZero(SysConvert.to_binary(data1),num-1).length<Anticipation.fullZero(SysConvert.to_binary(data2),num-1).length){
                return '1';
            }else{
                return '0';
            }
        }
    }
    static judgeAf(data1,data2){      //辅助进位/借位标志。AF为0，第3位无进位/借位；AF为1，第3位有进位/借位
        data1 = SysConvert.to_binary(data1);
        data2 = SysConvert.to_binary(data2);
        if(data1[data1.length-5] === data2[data2.length-5]){         //第4位相同，则表示没有进位或者借位
            return '1';
        }else{
            return '0';
        }
    }
    static judgeZf(data2){      //零标志。为零，ZF为1；不为零，ZF为0
        if(data2===0){
            return '1';
        }else{
            return '0';
        }
    }
    static judgeSf(data2){     //符号标志。正号，SF为0；负号，SF为1
        if(data2<0){
            return '1';
        }else{
            return '0';
        }
    }
    static judgeOf(data1,data2){    //溢出标志。OF为0，无溢出；OF为1，有溢出
        if(data2*data1<0){
            return '0';
        }else{
            if(SysConvert.to_binary(data1).length<SysConvert.to_binary(data2).length){
                return '1';
            }else{
                return '0';
            }
        }
    }
    static judgePf(data2){   //奇偶标志。奇数个1，PF为0；偶数个1，PF为1
        let number = Anticipation.fullZero(SysConvert.to_binary(data2),7);
        let n = 0;
        for(let i=number.length-1;i>0;i--){
            if(number[i] === '1'){
                n++;
            }
        }
        if(n%2 === 0){
            return '1';
        }else{
            return '0';
        }

    }
    static judgeDf(data1,data2){   //方向标志。字符串操作待定
        return '0';
    }
    static judgeIf(data1,data2){   //中断标志。中断待定
        return '0';
    }
    static judgeTf(data1,data2){    //陷阱标志。TF等于0，禁止单步，等于1，允许单步
        return '0';
    }
}