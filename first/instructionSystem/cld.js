class cld
{
    static CLD(order,chip)
    {
        let temp=chip.getRegisterByName("F");
        temp[10] = "0";
        chip.setRegister("F",temp);
    }
}
