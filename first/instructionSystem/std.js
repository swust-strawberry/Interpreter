class Std
{
    static std(order,ram)
    {
        let temp = ram.chip.getRegisterByName("F");
        temp[10] = "1";
        ram.chip.setRegister("F",temp);
    }
}
