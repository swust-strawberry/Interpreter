class Addressing_mode{

    //直接寻址
    static direct(str,chip){
        let offset,seg;
        if(this.judge_colon(str)){
            offset = str.slice(this.judge_colon(str)+2,str.length-1);
            seg = str.slice(0,this.judge_colon(str));
        }else{
            offset = str.slice(1,str.length-1);
            seg = 'DS';
        }
        return SysConvert.to_decimal(chip.getRegister(seg))+SysConvert.to_decimal(offset);
    }

    //寄存器间接寻址
    static register_indirect(str,chip){
        let reg,seg;
        if(this.judge_colon(str)){
            reg = str.slice(this.judge_colon(str)+2,str.length-1);
            seg=str.slice(0,this.judge_colon(str));
        }else{
            reg = str.slice(1,str.length-1);
            seg = seg_(reg);
        }
        return SysConvert.to_decimal(chip.getRegister(reg))+SysConvert.to_decimal(chip.getRegister(seg));
    }
    //寄存器相对寻址
    static register_relative(str,chip){
        let reg,seg,rel;
        if(this.judge_colon(str)){
            seg = str.slice(0,this.judge_colon(str));
            if(this.judge_brackets(str)!==this.judge_colon(str)+1){
                rel = str.slice(this.judge_colon(str)+1,this.judge_brackets(str));
                reg = str.slice(this.judge_brackets(str)+1,str.length-1);
            }else{
                let plus = this.judge_plus(str);
                if(plus){
                    if(this.judge_reg(str.slice(plus-2,plus))){
                        reg = str.slice(plus-2,plus);
                        rel = str.slice(plus+1,str.length-1);
                    }else{
                        reg = str.slice(plus+1,str.length-1)
                        rel = str.slice(this.judge_colon(str)+2,plus);
                    }
                }else{
                    reg = str.slice(this.judge_colon(str)+2,this.judge_colon(str)+4);
                    rel = str.slice(this.judge_colon(str)+4,str.length-1);
                }
            }
        }else{
            if(this.judge_brackets){
                reg = str.slice(this.judge_brackets(str)+1,str.length-1);
                rel = str.slice(0,this.judge_brackets(str));
            }else{
                let plus = this.judge_plus(str);
                if(plus){
                    if(this.judge_reg(str.slice(plus-2,plus))){
                        reg = str.slice(plus-2,plus);
                        rel = str.slice(plus+1,str.length-1);
                    }
                    else{
                        reg = str.slice(plus+1,str.length-1);
                        rel = str.slice(1,plus);
                    }
                }else{
                    reg = str.slice(1,3);
                    rel = str.slice(3,str.length-1);
                }
            }
            seg = this.seg_(reg);
        }
        return SysConvert.to_decimal(chip.getRegister(seg)) + SysConvert.to_decimal(chip.getRegister(reg)) + SysConvert.to_decimal(rel);
        // let relative = str.slice(3,str.length-1);
        // let base = this.register_indirect(register,chip);

        // if(str[2] == '+'){
        //     return base+SysConvert.to_decimal(relative);
        // }else{
        //     return base-SysConvert.to_decimal(relative);
        // }
    }
    //基址变址
    static base_indexed(str,chip){
        let reg_base,reg_index,seg;
        let colon = this.judge_colon(str);
        if(colon){
            seg =  str.slice(0,colon);
            let plus = this.judge_plus(str);
            if(plus){
                reg_base = str.slice(colon+2,plus);
                reg_index = str.slice(plus,str.length-1);
            }else{
                reg_base = str.slice(colon+2,colon+4);
                reg_index = str.slice(colon+6,colon+8)
            }
        }else{
            let plus = this.judge_plus(str);
            if(plus){
                reg_base = str.slice(1,plus);
                reg_index = str.slice(plus+1,str.length-1);
                if(reg_base === 'BP' || reg_index === 'BP')
                    seg = 'SS';
                else
                    seg = 'DS';
            }
        }
        return SysConvert.to_decimal(chip.getRegister(seg)) + SysConvert.to_decimal(chip.getRegister(reg_base)) + SysConvert.to_decimal(chip.getRegister(reg_index));
    }
    //相对基址变址
    static relative_base_indexed(str){
        let reg_base,reg_index,rel,seg;
        let colon = this.judge_colon(str);
        if(colon){
            seg = str.slice(0,colon);
            if(1){

            }
        }
    }

    static to_addressing(str){

    }
    static getBase(str){
        let seg;
        let register;
        if(str[0]==='['){
            if(str.length===4){
                register = str.slice(1,3);
                if(register ==='SI' || register==='BI' || register==='BX'){
                    seg='DS';
                }else if(register === 'BP'){
                    seg='SS';
                }else{
                    throw Error("not valid register");
                }
            }else if(str.length>4){
                if(str[3]){

                }
            }

        }
        if(str[2]===':'){
            seg = str.slice(0,2);
        }
        else{
            if(str.slice(4,6) ===  'SI'||str.slice(4,6) ===  'BI'||str.slice(4,6) ===  'BX'){
                seg='DS';
            }else if(str.slice(4,6) === 'BP'){
                seg='SS';
            }else{
                throw Error("not valid register");
            }
        }

    }
    static seg_(str){
        if(str==='SI' || str==='BI' || str==='BX'){
            return 'DS';
        }else if(str === 'BP'){
            return 'SS';
        }else{
            throw Error("not valid register");
        }
    }
    static judge_reg(str){
        if(str==='SI' || str==='BI' || str==='BX'||str === 'BP'){
            return true;
        }else{
            return false;
        }
    }
    static judge_colon(str){
        let flag=0;
        for(let i=0;i<str.length;i++){
            if(str[i]===':'){
                flag = i;
                break;
            }
        }
        return flag;
    }
    static judge_brackets(str){
        let flag=0;
        for(let i=0;i<str.length;i++){
            if(str[i]==='['){
                flag = i;
                break;
            }
        }
        return flag;
    }
    static judge_plus(str){
        let flag=0;
        for(let i=0;i<str.length;i++){
            if(str[i]==='+'){
                flag = i;
                break;
            }
        }
        return flag;
    }
}

