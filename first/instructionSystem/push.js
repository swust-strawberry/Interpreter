class Push {
    static push(operand,ram){
        let data;
        if(ram.getRegisterByName(operand)){
            data = ram.getRegisterByName(operand);
        }
        if(operand.indexOf('[') !==-1 ){
            data = ram.getRamByAddress(Addressing_mode.to_addressing(operand));
        }
        let ss = SysConvert.to_decimal(ram.chip.getRegisterByName ("SS"));
        let sp = SysConvert.to_decimal(ram.chip.getRegisterByName ("SP"));
        sp = sp - 2;
        //入栈CS
        //低2位先入栈
        ram.setRam(ss * 16 + sp , data.slice(2,5));
        //高2位再入栈
        ram.setRam(ss * 16 + sp + 1 , data.slice(0,2)+'H');
        ram.chip.setRegister("SP", Anticipation.fullZero(SysConvert.to_hexadecimal(sp) + 'H',4));//改变SP寄存器
        return ram;
    }
}