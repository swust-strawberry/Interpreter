class Loop{
    static loop(label,ram){
        let cx = SysConvert.to_decimal(ram.chip.getRegisterByName('CX'));
        cx--;
        if(cx>0) {
            let currentIp = SysConvert.to_decimal(ram.chip.getRegisterByName("IP"));
            let currentCs = SysConvert.to_decimal(ram.chip.getRegisterByName('CS'));
            let currentAddress = currentCs * 16 + currentIp;
            let flagAddress = ram.getLabelVariable(label);
            let offset = flagAddress - currentAddress;
            flagIp = currentIp + offset;
            ram.chip.setRegister('IP',flagIp);
        }
        ram.chip.setRegister('CX',cx);
        return ram;
    }
}