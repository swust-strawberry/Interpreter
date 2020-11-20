class sti
{
    static STI(order,chip)
    {
        let temp=chip.getRegisterByName("F");
        temp[9] = "1";
        chip.setRegister("F",temp);
    }
}