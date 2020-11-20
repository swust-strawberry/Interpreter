class Clc
{
    static cmc(order,ram)
    {
        let temp=ram.chip.getRegisterByName("F");
        if(temp[0] === "0")
        {
            temp[0] = "1";
            ram.chip.setRegister("F",temp);
        }
        else
        {
            temp[0] = "0";
            ram.chip.setRegister("F",temp);
        }
    }
}


