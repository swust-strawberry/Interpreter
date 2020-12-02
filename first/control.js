class Control{
    static initRegister(ram){
        let cs = ram.getSegList(ram.seg_Name.get('CS'));
        let ss = ram.getSegList(ram.seg_Name.get('SS'));
        let ds = ram.getSegList(ram.seg_Name.get('DS'));
        let es = ram.getSegList(ram.seg_Name.get('ES'));
        ram.chip.setRegister('CS',cs);
        ram.chip.setRegister('DS',ds);
        ram.chip.setRegister('SS',ss);
        ram.chip.setRegister('ES',es);
        ram.chip.setRegister('IP','0000H');
        ram.chip.setRegister('SP','FFFFH');
        ram.chip.setRegister('BP','0000H');
        ram.chip.setRegister('SI','0000H');
        ram.chip.setRegister('DI','0000H');
        ram.chip.setRegister('FLAGS','0000H');
        ram.chip.setRegister('AX','0000H');
        ram.chip.setRegister('BX','0000H');
        ram.chip.setRegister('CX','0000H');
        ram.chip.setRegister('DX','0000H');
        return ram;
    }

    static getInstruction(ram){
        let seg_address = ram.chip.getRegisterByName('CS');
        let offset_address = ram.chip.getRegisterByName('IP');
        address = SysConvert.to_decimal(seg_address)*16 + SysConvert.to_decimal(offset_address);
        return ram.getRamByAddress(address);
    }

    static upgradeIP(instruction,ram){
        let byte = Anticipation.instructionByte(instruction);
        let offset_address = ram.chip.getRegisterByName('IP');
        let ip = SysConvert.to_hexadecimal(SysConvert.to_decimal(offset_address)+byte)+'H';
        ram.chip.setRegister('IP',ip);
        return ram;
    }

    static analysisInstruction(instruction,ram){
        ram = this.upgradeIP(instruction,ram);
        if(instruction[0]==='MOV'){
            return Mov.mov(instruction[1],instruction[2],ram);
        }else if(instruction[0]==='XOR'){
            return Xor.xor(instruction[1],instruction[2],ram);
        }else if(instruction[0]==='CALL'){
            return Call.call(instruction[1],ram);
        }else if(instruction[0]==='RET'){
            return Call.ret(ram);
        }else if(instruction[0]==='LOOP'){
            return Loop.loop(instruction[1],ram);
        }
    }
}
