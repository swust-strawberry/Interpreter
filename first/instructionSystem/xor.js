class Xor
{
    static xor(operand1,operand2,ram){
        let num1,num2;
        if(operand2.indexOf('[')!==-1){
            num2 = ram.getRamByAddress(Addressing_mode.to_addressing(operand2,ram));
        }else if(ram.db_variable.get(operand2)){
            let address = ram.db_variable.get(operand2);
            num2 = ram.getRamByAddress(address);
        }else if(ram.dw_variable.get(operand2)){
            let address = ram.dw_variable.get(operand2);
            let h = ram.getRamByAddress(address+1);
            let l = ram.getRamByAddress(address);
            num2 = h.slice(0,2)+l;
        }else if(ram.chip.getRegisterByName(operand2)){
            num2 = ram.chip.getRegisterByName(operand2);
        }else{
            num2 = operand2;
        }
        let endNum = String(),x,y;
        if(operand1.indexOf('[')!==-1){
            let address = Addressing_mode.to_addressing(operand1,ram);
            num1 = ram.getRamByAddress(address);
            x = Anticipation.fullZero(SysConvert.to_binary(num1),7);
            y = Anticipation.fullZero(SysConvert.to_binary(num2),7);
            for(let i=0;i<8;i++){
                endNum += SysConvert.to_binary((SysConvert.to_decimal(x[i]+'B') ^ SysConvert.to_decimal(y[i]+'B'))+'B');
            }
            ram.setRam(address,Anticipation.fullZero(SysConvert.to_hexadecimal(endNum+'B')+'H',2));
        }else if(ram.chip.getRegisterByName(operand1)){
            num1 = ram.chip.getRegisterByName(operand1);
            if(num1.length>3){
                x = Anticipation.fullZero(SysConvert.to_binary(num1),15);
                y = Anticipation.fullZero(SysConvert.to_binary(num2),15);
            }else{
                x = Anticipation.fullZero(SysConvert.to_binary(num1),7);
                y = Anticipation.fullZero(SysConvert.to_binary(num1),7);
            }
            for(let i=0;i<x.length;i++){
                endNum += SysConvert.to_binary((SysConvert.to_decimal(x[i]+'B') ^ SysConvert.to_decimal(y[i]+'B'))+'B');
            }
            ram.chip.setRegister(operand1,endNum);
        }
        return ram;
    }
}