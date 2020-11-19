class Ram{
    ram_num = 256;
    db_variable = new Map();
    dw_variable = new Map();
    label_variable = new Map();
    ramList = new Map();
    getRamByAddress(address){   //返回地址中的内容，即数据，数据的类型是numbers数组01串
        return this.ramList.get(address);
    }
    setRam(address,data){    //将数据存入内存单元中，address为地址，data为该地址应存的内容
        this.ramList = new Map([[address,data]]);
    }
}