class Cli
{
    static cli(order,ram)
    {
        let temp = ram.chip.getRegisterByName("F");
        temp[9] = "0";
        ram.chip.setRegister("F",temp);
    }
}

