class Mov {
    static mov(operand1,operand2,ram){
        let arr = ["AX","BX","CX","DX","SP","BP","SI","DI","DS","ES","SS","CS","IP","flags","AH","AL","BH","BL","CH","CL","DH","DL"];
        let num;
        if (this.judge_bra(operand2)){
            num = ram.getRamByAddress(Addressing_mode.to_addressing(operand2,ram));
        }else{
            for(let i = 0;i < arr.length;i++){
                if(operand2 === arr[i]){
                    num = ram.chip.getRegisterByName(operand2);
                }
            }
            num = num?num:SysConvert.to_binary(operand2);    //不知道data2是用几进制表示的，所以用到进制转换，把他转换成二进制的字符串，因为寄存器里就是用二进制的字符串存的
        }

        if (this.judge_bra(operand1)){
            let address = Addressing_mode.to_addressing(operand1,ram);
            ram.setRam(address,num);
        }else{
            for(let i = 0;i < arr.length;i++){
                if(operand1 === arr[i]){
                    ram.chip.setRegister(operand1,num);
                }
            }
        }
        return ram;
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