
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function getRandom(max, min){
  return Math.floor(Math.random() * ((max - min) + min))
}

function generateCode(){
  let code = []
  for( let i = 0; i < 6; i++){
    let random = getRandom(alphabet.length - 1, 0)
    code.push(alphabet[random])
  }

  return code.join("");
}

module.exports = generateCode;