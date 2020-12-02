class Ram{
    constructor() {
        this.ram_num = 256;
        this.db_variable = new Map();     //键：定义为半字类型的变量名（用户自定义的名字），值：该变量在内存中的首地址（内存中的物理地址（十进制的数））
        this.dw_variable = new Map();      //键：定义为字类型的变量名（用户自定义的名字），值：该变量在内存中的首地址（内存中的物理地址（十进制的数））
        this.label_variable = new Map();    //键：标号名，值：该标号名的第一条指令对应在内存中的物理地址（十进制的数）
        this.ramList = new Map();    //键：内存中的物理地址（十进制的数），值：该地址的内容
        this.seg_Name = new Map();   //键：段寄存器名（CS,DS,SS,ES），值：段名（用户自定义的段名）
        this.segList = new Map();   //键：段名（用户自定义的段名），值：段地址（十六进制）
        // // this.ioList = new Map([['']]);
        this.procedureNameList = new Map();      //键：子程序名（用户自定义），值：该子程序的第一条指令对应在内存中的物理地址（十进制数）
        this.chip = new Chip();      //定义在内存Ram类中的芯片Chip类
        this.start = null;        //该变量程序起始的物理地址（十进制的数）
    }

    getRamByAddress(address){   //返回地址中的内容，即数据，数据的类型是numbers数组01串
        return this.ramList.get(address);
    }
    setRam(address,data){    //将数据存入内存单元中，address为地址，data为该地址应存的内容
        this.ramList.set(address,data);
    }
}