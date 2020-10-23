class SysConvert{
    static decimal_binary(str){
        let num=parseInt(str,10);
        return num.toString(2);
    }
    static hexadecimal_binary(str){
        let num=parseInt(str,16);
        return num.toString(2);
    }
    static binary_binary(str){
        let num=parseInt(str,2);
        return num.toString(2);
    }

    static decimal_hexadecimal(str){
        let num=parseInt(str,10);
        return num.toString(16);
    }
    static hexadecimal_hexadecimal(str){
        let num=parseInt(str,16);
        return num.toString(16);
    }
    static binary_hexadecimal(str){
        let num=parseInt(str,2);
        return num.toString(16);
    }

    static to_hexadecimal(str){
        if(str[str.length-1] === 'H')
            return str[0]==='-'?this.hexadecimal_hexadecimal(str.slice(1,str.length)):this.hexadecimal_hexadecimal(str);
        else if(str[str.length-1]==='B')
            return str[0]==='-'?this.binary_hexadecimal(str.slice(1,str.length)):this.binary_hexadecimal(str);
        else
            return str[0]==='-'?this.decimal_hexadecimal(str.slice(1,str.length)):this.decimal_hexadecimal(str);
    }

    static to_binary(str){
        if(str[str.length-1]==='H')
            return str[0]==='-'?this.hexadecimal_binary(str.slice(1,str.length)):this.hexadecimal_binary(str);
        else if(str[str.length-1]==='B')
            return str[0]==='-'?this.binary_binary(str.slice(1,str.length)):this.binary_binary(str);
        else
            return str[0]==='-'?this.decimal_binary(str.slice(1,str.length)):this.decimal_binary(str);
    }

    static to_decimal(str){
        if(str[str.length-1]==='H')
            return str[0]==='-'?0-parseInt(str.slice(1,str.length),16):parseInt(str,16);
        else if(str[str.length-1]==='B')
            return str[0]==='-'?0-parseInt(str.slice(1,str.length),2):parseInt(str,2);
        else
            return str[0]==='-'?0-parseInt(str.slice(1,str.length),10):parseInt(str,10);
    }
}