class cli
{
    static CLI(order,chip)
    {
        let temp = chip.getRegisterByName("F");
        temp[9] = "0";
        chip.setRegister("F",temp);
    }
}

