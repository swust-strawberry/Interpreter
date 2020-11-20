class Sti
{
    static sti(order,ram)
    {
        let temp = ram.chip.getRegisterByName("F");
        temp[9] = "1";
        ram.chip.setRegister("F",temp);
    }
}