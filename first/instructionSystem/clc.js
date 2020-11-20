class clc {
    static CLC(order, chip) {
        let temp = chip.getRegisterByName("F");
        temp[0] = "0";
        chip.setRegister("F", temp);
    }
}