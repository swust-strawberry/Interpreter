class Call
{
    static call(order,ram)
    {

        //段内调用段间调用时，在栈顶的都是IP，所以此处不管指令长度等，将先将CS入库，再将IP入库
        let k = ram.chip.getRamByAddress(order.data).search(/AX|BX|CX|DX|SP|BP|SI|DI|DS|ES|SS|CS|IP|F|AH|AL|BH|BL|CH|CL|DH|DL/i);//k确定是否带寄存器;
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP"));//当前IP
        let currentCS = SysConvert.to_decimal(ram.chip.getRegisterByName ("CS"));//当前CS,10进制？
        let currentSS = SysConvert.to_decimal(ram.chip.getRegisterByName("SS"));
        let currentSP = SysConvert.to_decimal(ram.chip.getRegisterByName("SP"));
        //sp=sp-2
        currentSP = currentSP - 2;
        //入栈CS
        //let currentSS = ram.segNameList("SS");
        ram.setRam(currentSS * 16 + currentSP , currentCS );
        ram.chip.setRegister("SP", SysConvert.to_hexadecimal(currentSP + 'H'));//SP存入内存
        currentSP = SysConvert.to_decimal(ram.chip.getRegisterByName("SP"));
        //sp=sp-2
        currentSP = currentSP - 2;
        //入栈IP
        //let currentSS = ram.segNameList("SS");
        ram.setRam( currentSS * 16 + currentSP , currentIP);
        ram.chip.setRegister("SP", SysConvert.to_hexadecimal(currentSP + 'H'));//SP存入内存
        if(k === -1 )//直接
        {
            //这一版本不考虑段间转移，因此只用改变IP
            //改变IP
            tempIP = SysConvert.to_decimal(Addressing_mode.direct( ram.chip.getRamByAddress(order.data,ram) , ram ));
            // ram.chip.setRegister("CS" , SysConvert.to_binary())
            let CS = tempIP / 2^4; //得到当前CS
            let IP = tempIP % 2^16; // 得到当前IP
            ram.chip.setRegister ("IP" , SysConvert.to_hexadecimal( IP + 'H'));
            ram.chip.setRegister ("CS" , SysConvert.to_hexadecimal( CS + 'H'));
            return ram;
        }
        else//间接
        {
            tempIP = SysConvert.to_decimal(Addressing_mode.register_indirect( ram.chip.getRamByAddress(order.data) , ram ));
            let CS = tempIP / 2^4; //得到当前CS
            let IP = tempIP % 2^16; // 得到当前IP
            ram.chip.setRegister ("IP" , SysConvert.to_hexadecimal( IP + 'H'));
            ram.chip.setRegister ("CS" , SysConvert.to_hexadecimal( CS + 'H'));
            return ram;
        }
    }
}