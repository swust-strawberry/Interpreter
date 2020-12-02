class Call {
    static call(operand,ram) {
        //段内调用段间调用时，在栈顶的都是IP，所以此处不管指令长度等，将先将CS入库，再将IP入库
        let currentIp = ram.chip.getRegisterByName ("IP");//当前IP
        let currentCs = ram.chip.getRegisterByName ("CS");//当前CS,10进制？
        let ss = SysConvert.to_decimal(ram.chip.getRegisterByName ("SS"));
        let sp = SysConvert.to_decimal(ram.chip.getRegisterByName ("SP"));
        //sp=sp-2
        sp = sp - 2;
        //入栈CS
        //低2位先入栈
        ram.setRam(ss * 16 + sp , currentCs.slice(2,5));
        //高2位再入栈
        ram.setRam(ss * 16 + sp + 1 , currentCs.slice(0,2)+'H');
        ram.chip.setRegister("SP", Anticipation.fullZero(SysConvert.to_hexadecimal(sp) + 'H',4));//改变SP寄存器
        sp = SysConvert.to_decimal(ram.chip.getRegisterByName("SP"));
        //sp=sp-2
        sp = sp - 2;
        //入栈IP
        //低2位先入栈
        ram.setRam( ss * 16 + sp , currentIp.slice(2,5));
        //高2位再入栈
        ram.setRam(ss * 16 + sp + 1 , currentIp.slice(0,2)+'H');
        ram.chip.setRegister("SP", Anticipation.fullZero(SysConvert.to_hexadecimal(sp) + 'H',4));//改变SP寄存器
        let currentAddress = SysConvert.to_decimal(currentCs) * 16 + SysConvert.to_decimal(currentIp);
        let flagAddress;
        if(ram.procedureNameList.get(operand)) {//这一版本不考虑段间转移，因此只用改变IP
            flagAddress = ram.procedureNameList.get(operand);
        }
        else{
            flagAddress = Addressing_mode.to_addressing(operand);
        }
        let offset = flagAddress - currentAddress;
        currentIp = SysConvert.to_decimal(currentIp) + offset;
        ram.chip.setRegister('IP',currentIp);
        return ram;
    }
    static ret(ram){
        let ss = SysConvert.to_decimal(ram.chip.getRegisterByName('SS'));
        let sp = SysConvert.to_decimal(ram.chip.getRegisterByName('SP'));
        //出栈IP
        //先出栈高2位
        let ipl = ram.getRamByAddress(ss*16+sp);
        //再出栈低2位
        let iph = ram.getRamByAddress(ss*16+sp+1);
        let ip = iph.slice(0,2)+ipl.slice(0,2)+'H';
        ram.chip.setRegister('IP',ip);
        ram.chip.setRegister("SP", Anticipation.fullZero(SysConvert.to_hexadecimal(sp) + 'H',4));//改变SP寄存器
        sp = SysConvert.to_decimal(ram.chip.getRegisterByName("SP"));
        sp = sp + 2;
        //出栈CS
        //先出栈高2位
        let csl = ram.getRamByAddress(ss*16+sp);
        //再出栈低2位
        let csh = ram.getRamByAddress(ss*16+sp+1);
        let cs = csh.slice(0,2)+csl.slice(0,2)+'H';
        ram.chip.setRegister('CS',cs);
        sp = sp + 2;
        ram.chip.setRegister("SP", Anticipation.fullZero(SysConvert.to_hexadecimal(sp) + 'H',4));//改变SP寄存器
        return ram;
    }
}