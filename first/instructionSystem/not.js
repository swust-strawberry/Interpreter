class Not
{
    static not(order,ram)
    {
        let k = ram.chip.getRamByAddress(order.data).indexOf("[");//k确定是否带】;
        if(k ===-1)
        {
            let k = ram.chip.getRamByAddress(Addressing_mode.direct(order.data,ram));
            k = ~k;
            ram.chip.setRam(order,k);
        }
        else
        {
            let k = ram.chip.getRamByAddress(Addressing_mode.register_indirect(order.data,ram));
            k = ~k;
            ram.chip.setRam(order,k);
        }
    }
}