class jxx
{
    static JAE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');//获得当前IP的值
        if(chip.getRegisterByName("F")[0] === "0")
        {
            // var k=order.data2.indexOf("[")//k确定是否带】
            //if(k==-1)
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
        }
    }
    static JNB(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');//获得当前IP的值
        if(chip.getRegisterByName("F")[0] === "0")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JB(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[0] === "1")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JNAE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[0] === "1")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JC(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[0] === "1")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JNC(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[0] === "1")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JZ(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[6] === "1")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[6] === "1")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JNZ(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[6] === "0")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JNE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[6] === "0")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JNO(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[11] === "0")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JO(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[11] === "1")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JNP(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[2] === "0")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JPO(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[2] === "0")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JP(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[2] === "1")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JPE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[2] === "1")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JNS(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[7] === "0")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JS(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("F")[7] === "1")
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JA(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(chip.getRegisterByName("F")[0]) || SysConvert.to_decimal(chip.getRegisterByName("F")[6])) === 0)
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JNBE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.get_Register_By_Name ("IP")+'B');
        if((SysConvert.to_decimal(chip.getRegisterByName("F")[0]) || SysConvert.to_decimal(chip.getRegisterByName("F")[6])) === 0)
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }

    static JBE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.get_Register_By_Name ("IP")+'B');
        if((SysConvert.to_decimal(chip.get_Register_By_Name("F")[0]) || SysConvert.to_decimal(chip.getRegisterByName("F")[6])) === 1)
            chip.set_Register("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JNA(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.get_Register_By_Name ("IP")+'B');
        if((SysConvert.to_decimal(chip.getRegisterByName("F")[0]) || SysConvert.to_decimal(chip.getRegisterByName("F")[6])) === 1)
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JGE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(chip.getRegisterByName("F")[11])) === 0)
            chip.set_Register("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JNL(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(chip.getRegisterByName("F")[11])) === 0)
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JL(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(chip.getRegisterByName("F")[11])) === 1)
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JNGE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if((SysConvert.to_decimal(chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(chip.getRegisterByName("F")[11])) === 1)
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JG(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(((SysConvert.to_decimal(chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(chip.getRegisterByName("F")[11])) || SysConvert.to_decimal(chip.getRegisterByName("F")[6]))=== 0)
            chip.set_Register("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JNLE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(((SysConvert.to_decimal(chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(chip.getRegisterByName("F")[11])) || SysConvert.to_decimal(chip.getRegisterByName("F")[6]))=== 0)
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JLE(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.get_Register_By_Name ("IP")+'B');
        if(((SysConvert.to_decimal(chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(chip.getRegisterByName("F")[11])) || SysConvert.to_decimal(chip.getRegisterByName("F")[6]))=== 1)
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JNG(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(((SysConvert.to_decimal(chip.getRegisterByName("F")[7]) ^ SysConvert.to_decimal(chip.getRegisterByName("F")[11])) || SysConvert.to_decimal(chip.getRegisterByName("F")[6]))=== 1)
            chip.setRegister("IP",SysConvert.to_binary(currentIP + order.data));
    }
    static JCXZ(order,chip)
    {
        let currentIP = SysConvert.to_decimal(chip.getRegisterByName ("IP")+'B');
        if(chip.getRegisterByName("CX") === "0")
            chip.set_Register("IP",SysConvert.to_binary(currentIP + order.data));
    }
}