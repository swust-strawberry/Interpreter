class stc
{
    static STC(order, chip) {
        let temp = chip.getRegisterByName("F");
        temp[0] = "1";
        chip.setRegister("F", temp);
    }
}
