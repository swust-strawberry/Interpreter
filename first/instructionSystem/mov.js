class Mov {
    static mov(operand1,operand2,ram){
        console.log(operand2);
        let num;
        if (operand2.indexOf('[')!==-1){
            num = ram.getRamByAddress(Addressing_mode.to_addressing(operand2,ram));
        }else if(ram.db_variable.get(operand2)){
            let address = ram.db_variable.get(operand2);
            num = ram.ram_num.get(address);
        }else if(ram.dw_variable.get(operand2)){
            let address = ram.dw_variable.get(operand2);
            let h = ram.ramList.get(address+1);
            let l = ram.ramList.get(address);
            num = h.slice(0,2)+l;
        }else if(ram.segList.get(operand2)) {
            num = ram.segList.get(operand2);
        }else if(ram.chip.register.get(operand2)){
            num = ram.chip.getRegisterByName(operand2);
        }else{
            num = operand2;
        }
        if (operand1.indexOf('[')!==-1){
            let address = Addressing_mode.to_addressing(operand1,ram);
            ram.setRam(address,num);
        }else if(ram.chip.register.get(operand1)){
            ram.chip.setRegister(operand1,num);
        }
        return ram;
    }
}