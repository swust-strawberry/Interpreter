class Clc {
    static clc(order, ram) {
        let temp = ram.chip.getRegisterByName("F");
        temp[0] = "0";
        ram.chip.setRegister("F", temp);
    }
}