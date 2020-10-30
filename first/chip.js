class Chip{
    Chip(){
        let bus = new Bus();
    }
    getRamByAddress(address){   //返回地址中的内容，即数据，数据的类型是nummber数组

    }
    getRegisterByName(name){   //返回寄存器中的内容，返回的是16位的字符串

    }
    getPort(name){

    }
    setRam(address,data){

    }
    setRegister(name,data){

    }
    setPort(name,value){

    }
    getBus(){
        return bus;
    }
}
class Bus{
    Bus(){
        let  ControlLine = new Array();
        let DataLine = new Array();
        let AddressLine = new Array();
    }
    getControlLine(){
        return ControlLine;
    }
    getDataLine(){
        return DataLine;
    }
    getAddressLine(){
        return AddressLine;
    }
}