class Pop {
    static pop(operand,ram){
        let ss = SysConvert.to_decimal(ram.chip.getRegisterByName('SS'));
        let sp = SysConvert.to_decimal(ram.chip.getRegisterByName('SP'));
        //出栈IP
        //先出栈高2位
        let dataL = ram.getRamByAddress(ss*16+sp);
        //再出栈低2位
        let dataH = ram.getRamByAddress(ss*16+sp+1);
        let data = dataH.slice(0,2)+dataL.slice(0,2)+'H';
        sp = sp + 2;
        ram.chip.setRegister("SP", Anticipation.fullZero(SysConvert.to_hexadecimal(sp) + 'H',4));//改变SP寄存器
        if(ram.getRegisterByName(operand)){
            ram.chip.setRegister(operand,data);
        }
        if(operand.indexOf('[')!==-1){
            let address = Addressing_mode.to_addressing(operand);
            ram.setRam(address,dataL);
            ram.setRam(address+1,dataH);
        }
        return ram;
    }
}