class Loop
{
    static loop(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        let tmp = SysConvert.to_decimal(ram.chip.getRegisterByName("CX"));
        tmp--;
        ram.chip.setRegister ( "CX" ,SysConvert.to_decimal(tmp) )
        if(tmp !== 0 )
        {
            //解决方法：再调用代码的管理块里面用try catch 忽略这里传过来的差错值，来运行下一个代码，
            //解决方法，知道当前指令的大小 ，直接改变IP

            //解决结果：不用上传，代码会自动跳转到下一条，类似for循环里的i++
            ram.chip.setRegister( "IP" , SysConvert.to_binary(currentIP + order.data))
        }

    }
}