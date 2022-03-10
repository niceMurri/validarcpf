function ValidateCpf(cpfSent) {
    Object.defineProperty(this, 'cpfClean', {
        get: function () {
            return cpfSent.replace(/\D+/g, '');
        },
        enumerable: true
    })
}

ValidateCpf.prototype.validate = function(){

    if(this.cpfClean.length != 11) return false
    if(this.isRepetitive()) return false;

    let cpfCut = this.cpfClean.slice(0,-2);

    //get First Number
    cpfCut += this.getNumeric(cpfCut);
    //validate
    if(!(this.cpfClean.slice(0,-1) == cpfCut)) return false;

    //get Second Number
    cpfCut += this.getNumeric(cpfCut);
    //validate
    if(!(cpfCut == this.cpfClean)) return false;


    return true;
}
ValidateCpf.prototype.getNumeric = function(cpf){

    const cpfArray = Array.from(cpf);
    
    let regress = cpfArray.length + 1;

    const numeric = 11 - (
        cpfArray.map(item => {
            const sum = Number(item) * regress
            regress--;
    
            return sum;
        }).reduce((acc, item) => acc + item) % 11
    );

    
    return numeric > 9 ? "0" : String(numeric);
}

ValidateCpf.prototype.isRepetitive = function(){
    return this.cpfClean[0].repeat(this.cpfClean.length) == this.cpfClean;
}

const cpf = new ValidateCpf('09668441575');


