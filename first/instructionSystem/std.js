class std
{
    static STD(order,chip)
    {
        let temp=chip.getRegisterByName("F");
        temp[10] = "1";
        chip.setRegister("F",temp);
    }
}
