class jmp
{
    static JMP(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        let k = chip.ram.getRamByAddress(order.data).indexOf("[");//k确定是否带】;
        if(k ===-1)
        {
            chip.setRegister ("IP",SysConvert.to_binary(currentIP + order.data));//SysConvert.to_binary
        }
        else
        {
            let tempIP;
            tempIP = SysConvert.to_decimal(Addressing_mode.register_indirect( chip.ram.getRamByAddress(order.data) , chip ) + 'B');
            chip.setRegister ("IP" , SysConvert.to_binary(currentIP + tempIP));
        }
    }
}