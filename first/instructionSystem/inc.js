class Inc {
    static inc(operand,ram){
        if(operand.indexOf('[')!==-1){
            address = Addressing_mode.to_addressing(operand);
            let data1 = SysConvert.to_decimal(ram.getRamByAddress(address));
            let data2 = data1+1;
            ram.chip.setFlagByName('AF',Flags.judgeAf(data1,data2));
            ram.chip.setFlagByName('ZF',Flags.judgeZf(data2));
            ram.chip.setFlagByName('SF',Flags.judgeSf(data2));
            ram.chip.setFlagByName('OF',Flags.judgeOf(data1,data2));
            ram.chip.setFlagByName('PF',Flags.judgePf(data2));
            ram.chip.setFlagByName('DF',Flags.judgeDf());
            ram.chip.setFlagByName('IF',Flags.judgeIf());
            ram.chip.setFlagByName('TF',Flags.judgeTf());
            ram.setRam(address,SysConvert.to_hexadecimal(data2)+'H');
        }else if(ram.getDbVariable(operand)){
            address = ram.getDbVariable(operand);
            let data1 = SysConvert.to_decimal(ram.getRamByAddress(address));
            let data2 = data1+1;
            ram.chip.setFlagByName('AF',Flags.judgeAf(data1,data2));
            ram.chip.setFlagByName('ZF',Flags.judgeZf(data2));
            ram.chip.setFlagByName('SF',Flags.judgeSf(data2));
            ram.chip.setFlagByName('OF',Flags.judgeOf(data1,data2));
            ram.chip.setFlagByName('PF',Flags.judgePf(data2));
            ram.chip.setFlagByName('DF',Flags.judgeDf());
            ram.chip.setFlagByName('IF',Flags.judgeIf());
            ram.chip.setFlagByName('TF',Flags.judgeTf());
            ram.setRam(address,SysConvert.to_hexadecimal(data2)+'H')
        }else if(ram.getDwVariable(operand)){
            address = ram.getDwVariable(operand);
            let data1 = SysConvert.to_decimal(ram.getRamByAddress(address+1).slice(0,2)+ram.getRamByAddress(address));
            let data2 = data1+1;
            ram.chip.setFlagByName('AF',Flags.judgeAf(data1,data2));
            ram.chip.setFlagByName('ZF',Flags.judgeZf(data2));
            ram.chip.setFlagByName('SF',Flags.judgeSf(data2));
            ram.chip.setFlagByName('OF',Flags.judgeOf(data1,data2));
            ram.chip.setFlagByName('PF',Flags.judgePf(data2));
            ram.chip.setFlagByName('DF',Flags.judgeDf());
            ram.chip.setFlagByName('IF',Flags.judgeIf());
            ram.chip.setFlagByName('TF',Flags.judgeTf());
            let data = Anticipation.fullZero(SysConvert.to_hexadecimal(data2),3);
            ram.setRam(address,data.slice(data.length-2,data.length)+'H');
            ram.setRam(address+1,data.slice(data.length-4,data.length-2)+'H');
        }else if(ram.chip.getRegisterByName(operand)){
            let data1 = SysConvert.to_decimal(ram.chip.getRegisterByName(operand));
            let data2 = data1+1;
            ram.chip.setFlagByName('AF',Flags.judgeAf(data1,data2));
            ram.chip.setFlagByName('ZF',Flags.judgeZf(data2));
            ram.chip.setFlagByName('SF',Flags.judgeSf(data2));
            ram.chip.setFlagByName('OF',Flags.judgeOf(data1,data2));
            ram.chip.setFlagByName('PF',Flags.judgePf(data2));
            ram.chip.setFlagByName('DF',Flags.judgeDf());
            ram.chip.setFlagByName('IF',Flags.judgeIf());
            ram.chip.setFlagByName('TF',Flags.judgeTf());
            ram.chip.setRegister(operand,Anticipation.fullZero(SysConvert.to_hexadecimal(data2)+'H',4));
        }
        return ram;
    }
}