class Stc
{
    static stc(order, ram) {
        let temp = ram.chip.getRegisterByName("F");
        temp[0] = "1";
        ram.chip.setRegister("F", temp);
    }
}
