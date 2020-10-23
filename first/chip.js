class Chip{
    Chip(){
        let bus = new Bus();
    }
    getRamByAddress(address){

    }
    getRegisterByName(name){

    }
    getPort(name){

    }
    setRam(address,order){

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