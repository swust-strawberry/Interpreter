class Jxx
{
    static jae(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');//获得当前IP的值
        if(ram.chip.getRegisterByName("F")[0] === "0")
        {
            // var k=order.data2.indexOf("[")//k确定是否带】
            //if(k==-1)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
        }
    }
    static jnb(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');//获得当前IP的值
        if(ram.chip.getRegisterByName("F")[0] === "0")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static jb(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[0] === "1")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jnAe(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[0] === "1")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static jc(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[0] === "1")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static jnc(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[0] === "1")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jz(order,ram)
    {

        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[6] === "1")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static je(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[6] === "1")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jnz(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[6] === "0")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jne(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[6] === "0")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static jno(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[11] === "0")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static jo(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[11] === "1")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static jnp(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[2] === "0")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static jpo(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[2] === "0")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static jp(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[2] === "1")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jpe(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[2] === "1")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static jns(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[7] === "0")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static js(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("F")[7] === "1")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static ja(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[0]) || SysConvert.to_decimal(ram.chip.getRegisterByName("F")[6])) === 0)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jnBe(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[0]) || SysConvert.to_decimal(ram.chip.getRegisterByName("F")[6])) === 0)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static jbe(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[0]) || SysConvert.to_decimal(ram.chip.getRegisterByName("F")[6])) === 1)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jna(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[0]) || SysConvert.to_decimal(ram.chip.getRegisterByName("F")[6])) === 1)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jge(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(ram.chip.getRegisterByName("F")[11])) === 0)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jnl(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(ram.chip.getRegisterByName("F")[11])) === 0)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jl(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(ram.chip.getRegisterByName("F")[11])) === 1)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jnGe(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(ram.chip.getRegisterByName("F")[11])) === 1)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jg(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(ram.chip.getRegisterByName("F")[11])) || SysConvert.to_decimal(ram.chip.getRegisterByName("F")[6]))=== 0)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jnLe(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(ram.chip.getRegisterByName("F")[11])) || SysConvert.to_decimal(chip.getRegisterByName("F")[6]))=== 0)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jle(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(ram.chip.getRegisterByName("F")[11])) || SysConvert.to_decimal(ram.chip.getRegisterByName("F")[6]))=== 1)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jng(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(((SysConvert.to_decimal(ram.chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(ram.chip.getRegisterByName("F")[11])) || SysConvert.to_decimal(ram.chip.getRegisterByName("F")[6]))=== 1)
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static jcXz(order,ram)
    {
        let currentIP = SysConvert.to_decimal(ram.chip.getRegisterByName ("IP")+'B');
        if(ram.chip.getRegisterByName("CX") === "0")
            ram.chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
}