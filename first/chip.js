class Chip{
    ram = new Ram();
    register = new Map([['AH',Array(8)]
        ,['AL',Array(8)]
        ,['BH',Array(8)]
        ,['BL',Array(8)]
        ,['CH',Array(8)]
        ,['AL',Array(8)]
        ,['DH',Array(8)]
        ,['DL',Array(8)]
        ,['BP',Array(16)]
        ,['SI',Array(16)]
        ,['DI',Array(16)]
        ,['SP',Array(16)]
        ,['IP',Array(16)]
        ,['FLAGS',Array(16)]
        ,['CS',Array(16)]
        ,['DS',Array(16)]
        ,['ES',Array(16)]
        ,['SS',Array(16)]]);
    pin = new Map([[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0]
        ,[21,0],[22,0],[23,0],[24,0],[25,0],[26,0],[27,0],[28,0],[29,0],[30,0],[31,0],[32,0],[33,0],[34,0],[35,0],[36,0],[37,0],[38,0],[39,0],[40,0]]);

    getRegisterByName(name){   //返回寄存器中的内容，返回的是8位或者16位的字符串
        if(name[1] === 'X'){
            let h=name[0]+'H',l=name[0]+'L';
            return this.register.get(h)+this.register.get(l);
        }else return this.register.get(name);
    }
    getPort(name){

    }

    setRegister(name,data){   //将数据存入寄存器中，name是寄存器名，data是数据，这里的数据应该是一个16位的01字符串
        if(name[1] === 'X'){
            let h=name[0]+'H';
            this.register.set(h,data);
            let l=name[0]+'L';
            this.register.set(l,data);
        }else this.register.set(name,data);
    }
    setPort(name,value){

    }

}
