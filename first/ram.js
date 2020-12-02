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
        this.start = null;
    }
    setRam_num(number){
        this.ram_num = number;
    }
    getRam_num(){
        return this.ram_num;
    }
    getRamByAddress(address){   //返回地址中的内容，即数据，数据的类型是numbers数组01串
        return this.ramList.get(address);
    }
    setRam(address,data){    //将数据存入内存单元中，address为地址，data为该地址应存的内容
        this.ramList.set(address,data);
    }
    getDbVariable(name){
        return this.db_variable.get(name);
    }
    setDbVariable(name,address){
        this.db_variable.set(name,address);
    }
    getDwVariable(name){
        return this.dw_variable.get(name);
    }
    setDwVariable(name,address){
        this.dw_variable.set(name,address);
    }
    getLabelVariable(name){
        return this.label_variable.get(name);
    }
    setLabelVariable(name,address){
        this.label_variable.set(name,address);
    }
    getSegName(name){
        return this.seg_Name.get(name);
    }
    setSegName(name,address){
        this.seg_Name.set(name,address);
    }
    getSegList(name){
        return this.segList.get(name);
    }
    setSegList(name,address){
        this.segList.set(name,address);
    }
    getProcedureNameList(name){
        return this.procedureNameList.get(name);
    }
    setProcedureNameList(name,address){
        this.procedureNameList.set(name,address);
    }
    setStart(name){
        this.start = name;
    }
    getStart(){
        return this.start;
    }
}