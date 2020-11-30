class Control{
    static initRegister(ram){
        let cs = ram.segNameList.get(Anticipation.getSegmentName('CS'));
        let ss = ram.segNameList.get(Anticipation.getSegmentName('SS'));
        let ds = ram.segNameList.get(Anticipation.getSegmentName('DS'));
        let es = ram.segNameList.get('ES');
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
        return ram.ramList.get(address);
    }

    static upgradeIP(str,ram){
        let byte = Anticipation.instructionByte(str);
        let ip = SysConvert.to_hexadecimal(SysConvert.to_decimal(offset_address)+byte)+'H';
        ram.chip.setRegister('IP',ip);
        return ram;
    }

    static analysisInstruction(str,ram){
        ram = this.upgradeIP(str,ram);
        if(str[0]==='MOV'){
            return Mov.mov(str[1],str[2],ram);
        }else if(str[0]===''){

        }
    }
}
