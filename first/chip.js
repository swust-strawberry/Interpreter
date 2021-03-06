class Chip{
    constructor() {
        this.register = new Map([['AH', '00H']
            , ['AL', '00H']
            , ['BH', '00H']
            , ['BL', '00H']
            , ['CH', '00H']
            , ['CL', '00H']
            , ['DH', '00H']
            , ['DL', '00H']
            , ['AX', '0000H']
            , ['BX', '0000H']
            , ['CX', '0000H']
            , ['DX', '0000H']
            , ['BP', '0000H']
            , ['SI', '0000H']
            , ['DI', '0000H']
            , ['SP', '0000H']
            , ['IP', '0000H']
            , ['FLAGS', '0000H']
            , ['CS', 'FFFFH']
            , ['DS', '0000H']
            , ['ES', '0000H']
            , ['SS', '0000H']]);
        this.io = new Map();
    }
    // pin = new Map([[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0]
    //     ,[21,0],[22,0],[23,0],[24,0],[25,0],[26,0],[27,0],[28,0],[29,0],[30,0],[31,0],[32,0],[33,0],[34,0],[35,0],[36,0],[37,0],[38,0],[39,0],[40,0]]);

    getRegisterByName(name){   //返回寄存器中的内容，返回的是8位或者16位的字符串
        return this.register.get(name);
    }

    setRegister(name,data){   //将数据存入寄存器中，name是寄存器名，data是数据
        if(name[1] === 'X'){
            this.register.set(name,Anticipation.fullZero(SysConvert.to_hexadecimal(data)+'H',4));
            let h = Math.floor(SysConvert.to_decimal(data)/256);
            this.register.set(name[0]+'H',Anticipation.fullZero(SysConvert.to_hexadecimal(h)+'H',2));
            let l = SysConvert.to_decimal(data)%256;
            this.register.set(name[0]+'L',Anticipation.fullZero(SysConvert.to_hexadecimal(l)+'H',2));
        }else if(name === 'AH' || name === 'AL' || name === 'BH' || name === 'BL'
            || name === 'CH' || name === 'CL' || name === 'DH' || name === 'DL' ){
            this.register.set(name,Anticipation.fullZero(SysConvert.to_hexadecimal(data)+'H',2));
            let h,l;
            if(name[1]==='H'){
                h = SysConvert.to_decimal(this.getRegisterByName(name))*256;
                l = SysConvert.to_decimal(this.getRegisterByName(name[0]+'L'));
            }else{
                h = SysConvert.to_decimal(this.getRegisterByName(name[0]+'H'))*256;
                l = SysConvert.to_decimal(this.getRegisterByName(name));
            }
            this.register.set(name[0]+'X',Anticipation.fullZero(SysConvert.to_hexadecimal(h+l)+'H',4));
        } else this.register.set(name,Anticipation.fullZero(SysConvert.to_hexadecimal(data)+'H',4));
    }

    getFlagByName(name){
        let flags = Anticipation.fullZero(SysConvert.to_binary(this.register.get('FLAGS')),15);
        if(name === 'CF'){
            return flags.charAt(15);
        }else if(name === 'PF'){
            return flags.charAt(13);
        }else if(name === 'AF'){
            return flags.charAt(11);
        }else if(name === 'ZF'){
            return flags.charAt(9);
        }else if(name === 'SF'){
            return flags.charAt(8);
        }else if(name === 'TF'){
            return flags.charAt(7);
        }else if(name === 'IF'){
            return flags.charAt(6);
        }else if(name === 'DF'){
            return flags.charAt(5);
        }else if(name === 'OF'){
            return flags.charAt(4);
        }else
            return -1;
    }

    setFlagByName(name,data){
        let flags = Anticipation.fullZero(SysConvert.to_binary(this.register.get('FLAGS')),15);
        if(name === 'CF'){
            flags = flags.slice(0,14)+data;
        }
        if(name === 'PF'){
            flags = flags.slice(0,13) + data + flags.slice(14,flags.length);
        }
        if(name === 'AF'){
            flags = flags.slice(0,11) + data + flags.slice(12,flags.length);
        }
        if(name === 'ZF'){
            flags = flags.slice(0,9) + data + flags.slice(10,flags.length);
        }
        if(name === 'SF'){
            flags = flags.slice(0,8) + data + flags.slice(9,flags.length);
        }
        if(name === 'TF'){
            flags = flags.slice(0,7) + data + flags.slice(8,flags.length);
        }
        if(name === 'IF'){
            flags = flags.slice(0,6) + data + flags.slice(7,flags.length);
        }
        if(name === 'DF'){
            flags = flags.slice(0,5) + data + flags.slice(6,flags.length);
        }
        if(name === 'OF'){
            flags = flags.slice(0,4) + data + flags.slice(5,flags.length);
        }
        this.setRegister('FLAGS',Anticipation.fullZero(SysConvert.to_hexadecimal(flags+'B')+'H',4));
    }
}
