class Mov{
    static mov(data1,data2,chip){
        let arr = ["AX","BX","CX","DX","SP","BP","SI","DI","DS","ES","SS","CS","IP","flags"];
        let num;
        if (this.judge_bra(data2)){
            num = getRamByAddress(Addressing_mode.to_addressing(data2,chip));
        }else{
            for(let i = 0;i < arr.length;i++){
                if(data2 === arr[i]){
                    num = getRegisterByName(data2);
                }
            }
            num = num?num:SysConvert.to_binary(data2);    //不知道data2是用几进制表示的，所以用到进制转换，把他转换成二进制的字符串，因为寄存器里就是用二进制的字符串存的
        }

        if (this.judge_bra(data1)){
            let address = Addressing_mode.to_addressing(data1,chip);
            Chip.setRam(address,num);
        }else{
            for(let i = 0;i < arr.length;i++){
                if(data1 === arr[i]){
                    Chip.setRegister(data1,num);
                }
            }
        }
    }

    static judge_bra(str){   //判断有无中括号，区分寻址方式
        for(let i=0;i<str.length;i++){
            if(str[i]==='['){
                return i;
            }
        }
        return 0;
    }
}
