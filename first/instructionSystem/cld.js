class Cld
{
    static cld(order,ram)
    {
        let temp=ram.chip.getRegisterByName("F");
        temp[10] = "0";
        ram.chip.setRegister("F",temp);
    }
}
