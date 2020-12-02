class Inc {
    static inc(operand,ram){
        if(operand.indexOf('[')){
            address = Addressing_mode.to_addressing(operand);
            let data = SysConvert.to_decimal(ram.getRamByAddress(address));
            data++;
            if(SysConvert.to_hexadecimal(data).length>2){
                ram.setFlagByName('')
            }
            ram.setRam(address,SysConvert.to_hexadecimal(data)+'H');
        }
    }
    static judgeCf(data1,data2){   //参数必须为十进制的数，data1是原数，data2是运算结果数
        if(data2<0){
            return '1';
        }else{
            if(SysConvert.to_binary(data1).length<SysConvert.to_binary(data2).length){
                return '1';
            }else{
                return '0';
            }
        }
    }
    static judgeAf(data1,data2){
        data1 = SysConvert.to_binary(data1);
        data2 = SysConvert.to_binary(data2);
        if(data1[11] === data2[11]){         //第四位相同，则表示没有进位或者借位
            return '1';
        }else{
            return '0';
        }
    }
    static judgeZf(data1,data2){

    }
    static judgeSf(data1,data2){

    }
    static judgeOf(data1,data2){

    }
    static judgePf(data1,data2){

    }
    static judgeDf(data1,data2){

    }
    static judgeIf(data1,data2){

    }
    static judgeTf(data1,data2){

    }
}