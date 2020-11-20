class Jmp
{
    static jmp(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        let k = ram.chip.getRamByAddress(order.data).indexOf("[");//k确定是否带】;
        if(k ===-1)
        {
            ram.chip.setRegister ("IP",SysConvert.to_binary(currentIP + order.data));//SysConvert.to_binary
        }
        else
        {
            let tempIP;
            tempIP = SysConvert.to_decimal(Addressing_mode.register_indirect( ram.chip.getRamByAddress(order.data) , ram ) + 'B');
            ram.chip.setRegister ("IP" , SysConvert.to_binary(currentIP + tempIP));
        }
    }
}