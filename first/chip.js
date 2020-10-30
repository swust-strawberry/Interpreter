class Chip{
    Chip(){
        let bus = new Bus();
    }
    getRamByAddress(address){   //返回地址中的内容，即数据，数据的类型是nummber数组01串

    }
    getRegisterByName(name){   //返回寄存器中的内容，返回的是16位的字符串

    }
    getPort(name){

    }
    setRam(address,data){    //将数据存入内存单元中，address为地址，data为该地址应存的内容

    }
    setRegister(name,data){   //将数据存入寄存器中，name是寄存器名，data是数据，这里的数据应该是一个16位的01字符串

    }
    setPort(name,value){

    }
    getBus(){
        return bus;
    }
}
class Bus{
    Bus(){
        let  ControlLine = new Array(20);
        let DataLine = new Array(20);
        let AddressLine = new Array(20);
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