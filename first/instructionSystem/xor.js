class Xor
{
    static xor(order1,order2,ram)
    {
        let k1 = ram.chip.getRamByAddress(order1.data).indexOf("[");//k1确定是否带】;
        let k2 = ram.chip.getRamByAddress(order2.data).indexOf("[");//k2确定是否带】;
        let num1;
        let num2;

        if(order1.data === order2.data)//先判断是否相同操作数，则 置零
        {
            if(k1 === -1)
            {
                ram.chip.setRegister ( order1.data , SysConvert.to_hexadecimal("0" +"H"));
                return ram;
            }
            else
            {
                let reg = new RegExp("]","[")//"[","]"就不行
                order1.data.replace(reg,"");//去【】
                ram.chip.setRegister ( order1.data , SysConvert.to_hexadecimal("0" + "H"));
                return ram;
            }
        }

        if(k1 ===-1)
            num1 = SysConvert.to_binary(Addressing_mode.direct( ram.chip.getRamByAddress(order1.data) , ram ));
        else
            num1 = SysConvert.to_binary(Addressing_mode.register_indirect( ram.chip.getRamByAddress(order1.data) , ram ));
        if(k2 ===-1)
            num2 = SysConvert.to_binary(Addressing_mode.direct( ram.chip.getRamByAddress(order2.data) , ram ));
        else
            num2 = SysConvert.to_binary(Addressing_mode.register_indirect( ram.chip.getRamByAddress(order2.data) , ram ));

        for(let i = 0 ; i < num1.length ; i++ )//按位异或
             num1[i] = (parseInt( num1[i] ) ^ parseInt( num2[i] )).toString();//后面是整数，前面是字符串

        ram.chip.setRegister ( order1.data , SysConvert.to_hexadecimal(num1 + 'H'));
        return ram;
    }

}