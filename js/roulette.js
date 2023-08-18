async function roulette(req) {
    const {number, amount} = req.query;

    return new Promise((resolve, reject) => {
        var rng = Math.floor(Math.random() * 37);
        var retorno;
        if(number == 0){
            if(number == rng){
                retorno = amount * 35;
                resolve(`You Win!\nRoll: `+rng+` Return: $`+retorno);``
            }else{
                resolve(`You Lose! Roll: `+rng);
            }
        }else if(number % 2 == 0){
            if(rng % 2 == 0){
                if(number == rng){
                    retorno = amount * 10;
                    resolve(`You Win!\nRoll: `+rng+` Return: $`+retorno);``
                }else{
                    retorno = amount * 1.5;
                    resolve(`Roll: `+rng+` Return: $`+retorno);
                }
            }else{
                resolve(`You Lose! Roll: `+rng);
            }
        }else{
            if(rng % 2 != 0){
                if(number == rng){
                    retorno = amount * 10;
                    resolve(`You Win!\nRoll: `+rng+` Return: $`+retorno);``
                }else{
                    retorno = amount * 1.5;
                    resolve(`Roll: `+rng+` Return: $`+retorno);
                }
            }else{
                resolve(`You Lose! Roll: `+rng);
            }
        }
    });
}

module.exports = {
    roulette
};