class clc
{
    static CMC(order,chip)
    {
        let temp=chip.getRegisterByName("F");
        if(temp[0] === "0")
        {
            temp[0] = "1";
            chip.setRegister("F",temp);
        }
        else
        {
            temp[0] = "0";
            chip.setRegister("F",temp);
        }
    }
}


