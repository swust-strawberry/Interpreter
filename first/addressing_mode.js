class Addressing_mode {

    //直接寻址-----1
    static direct(str, ram) {
        let offset, seg;
        let colon = this.judge_colon(str);
        if (colon) {    //指定段地址
            offset = str.slice(colon + 2, str.length - 1);
            seg = str.slice(0, colon);
        } else {    //默认段地址
            offset = str.slice(1, str.length - 1);
            seg = 'DS';
        }
        return SysConvert.to_decimal(ram.chip.getRegisterByName(seg))*16 + SysConvert.to_decimal(offset);
    }

    //寄存器间接寻址-----2
    static register_indirect(str, ram) {
        let reg, seg;
        let colon = this.judge_colon(str)
        if (colon) {      //指定段地址
            reg = str.slice(colon + 2, str.length - 1);
            seg = str.slice(0, colon);
        } else {    //默认段地址
            reg = str.slice(1, str.length - 1);
            seg = this.get_seg(reg);
        }
        return SysConvert.to_decimal(ram.chip.getRegisterByName(reg)) + SysConvert.to_decimal(ram.chip.getRegisterByName(seg))*16;
    }

    //寄存器相对寻址-----3
    static register_relative(str, ram) {
        let reg, seg, rel;
        let colon = this.judge_colon(str);
        if (colon) {     //指定段地址
            seg = str.slice(0, colon);
            reg = str.slice(colon + 2, colon + 4);
            rel = str[colon + 4] === '+' ? str.slice(colon + 5, str.length - 1) : str.slice(colon + 4, str.length - 1);
        } else {    //默认段地址
            reg = str.slice(1, 3);
            rel = str[3] === '+' ? str.slice(4, str.length - 1) : str.slice(3, str.length - 1);
            seg = this.get_seg(reg);
        }
        return SysConvert.to_decimal(ram.chip.getRegisterByName(seg))*16 + SysConvert.to_decimal(ram.chip.getRegisterByName(reg)) + SysConvert.to_decimal(rel);
    }

    //基址变址------4
    static base_indexed(str, ram) {
        let reg_base, reg_index, seg;
        let colon = this.judge_colon(str);
        if (colon) {    //指定段地址
            seg = str.slice(0, colon);
            reg_base = str.slice(colon + 2, colon + 4);
            reg_index = str.slice(str.length - 3, str.length - 1);
        } else {    //默认段地址
            reg_base = str.slice(1, 3);
            reg_index = str.slice(str.length - 3, str.length - 1);
            seg = (reg_base === 'BP' || reg_index === 'BP') ? 'SS' : 'DS';
        }
        return SysConvert.to_decimal(ram.chip.getRegisterByName(seg))*16 + SysConvert.to_decimal(ram.chip.getRegisterByName(reg_base)) + SysConvert.to_decimal(ram.chip.getRegisterByName(reg_index));
    }

    //相对基址变址-----5
    static relative_base_indexed(str, ram) {
        let reg_base, reg_index, rel, seg;
        let colon = this.judge_colon(str);
        if (colon) {     //指定段地址
            seg = str.slice(0, colon);
            reg_base = str.slice(colon + 2, colon + 4);
            reg_index = str.slice(colon + 5, colon + 7);
            rel = str[colon + 7] === '+' ? str.slice(colon + 8, str.length - 1) : str.slice(colon + 7, str.length - 1);
        } else {     //默认段地址
            reg_base = str.slice(1, 3);
            reg_index = str.slice(4, 6);
            rel = str[6] === '+' ? str.slice(7, str.length - 1) : str.slice(6, str.length - 1);
            seg = (reg_base === 'BP' || reg_index === 'BP') ? 'SS' : 'DS';
        }
        return SysConvert.to_decimal(ram.chip.getRegisterByName(seg))*16 + SysConvert.to_decimal(ram.chip.getRegisterByName(reg_base)) + SysConvert.to_decimal(ram.chip.getRegisterByName(reg_index)) + SysConvert.to_decimal(rel);
    }

    static to_addressing(str, ram) {
        let colon = this.judge_colon(str);
        let flag = colon ? colon + 1 : colon;
        if (str[flag + 3] === '+') {
            if (str[flag + 6] === '+' || str[flag + 6] === '-') {
                return this.relative_base_indexed(str, ram);
            } else if (this.judge_reg(str.slice(flag + 4, flag + 6))) {
                this.base_indexed(str, ram);
            } else {
                this.register_relative(str, ram);
            }
        } else {
            if (this.judge_reg(str.slice(flag + 1, flag + 3))) {
                this.register_indirect(str, ram);
            } else {
                this.direct(str, ram);
            }
        }
    }

    static byte(str){
        let colon = this.judge_colon(str);
        let flag = colon ? colon + 1 : colon;
        if (str[flag + 3] === '+') {
            if (str[flag + 6] === '+' || str[flag + 6] === '-') {
                return 5;
            } else if (this.judge_reg(str.slice(flag + 4, flag + 6))) {
                return 4;
            } else {
                return 3;
            }
        } else {
            if (this.judge_reg(str.slice(flag + 1, flag + 3))) {
                return 2;
            } else {
                return 1;
            }
        }
    }

    static get_seg(str) {
        if (str === 'SI' || str === 'BI' || str === 'BX') {
            return 'DS';
        } else if (str === 'BP') {
            return 'SS';
        } else {
            throw Error("not valid register");
        }
    }

    static judge_reg(str) {
        return str === 'SI' || str === 'BI' || str === 'BX' || str === 'BP';
    }

    static judge_colon(str) {
        let flag = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === ':') {
                flag = i;
                break;
            }
        }
        return flag;
    }
}

    // static common_addressing(str,flag,chip){
    //     if(str[flag+3]==='+'){
    //         if(str[flag+6]==='+' || str[flag+6]==='-'){
    //             this.relative_base_indexed(str,chip);
    //         }else if(this.judge_reg(str.slice(flag+4,flag+6))){
    //             this.base_indexed(str,chip);
    //         }else{
    //             this.register_relative(str,chip);
    //         }
    //     }else{
    //         if(str[flag+4]==='['){
    //             this.base_indexed(str,chip);
    //         }else{
    //             if(this.judge_reg(str.slice(flag+1,flag+3))){
    //                 this.register_indirect(str,chip);
    //             }else{
    //                 this.direct(str,chip);
    //             }
    //         }
    //     }
    // }
//     static spacial_relative(str,brackets,chip){   //相对地址提前的情况
//         if(str[brackets+3]==='+'){
//             this.relative_base_indexed(str,chip);
//         }else{
//             if(str[brackets+4]==='['){
//                 this.relative_base_indexed(str,chip);
//             }else{
//                 this.register_relative(str,chip);
//             }
//         }
//     }
// }



// static register_relative(str,chip){

//     // let relative = str.slice(3,str.length-1);
//     // let base = this.register_indirect(register,chip);

//     // if(str[2] == '+'){
//     //     return base+SysConvert.to_decimal(relative);
//     // }else{
//     //     return base-SysConvert.to_decimal(relative);
//     // }
// }



// static getBase(str){
//     let seg;
//     let register;
//     if(str[0]==='['){
//         if(str.length===4){
//             register = str.slice(1,3);
//             if(register ==='SI' || register==='BI' || register==='BX'){
//                 seg='DS';
//             }else if(register === 'BP'){
//                 seg='SS';
//             }else{
//              throw Error("not valid register");
//             }
//         }else if(str.length>4){
//             if(str[3]){

//             }
//         }

//     }
//     if(str[2]===':'){
//         seg = str.slice(0,2);
//     }
//     else{
//         if(str.slice(4,6) ===  'SI'||str.slice(4,6) ===  'BI'||str.slice(4,6) ===  'BX'){
//             seg='DS';
//         }else if(str.slice(4,6) === 'BP'){
//             seg='SS';
//         }else{
//             throw Error("not valid register");
//         }
//     }

// }

