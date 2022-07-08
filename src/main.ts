

console.log('test@!&&hala&&Q23(34'.split('&&'))
const myRe = new RegExp('(.*?)', 'g');

const myarr = myRe.exec('test(reza)')
console.log(myarr)

const txt = "(Q23(34 || 12)) & (Q12(45 && 11))";
let newtxt = txt.split('&')
console.log(newtxt)
const regExp = /\(([^)]+)\)/g;
const matches = [...txt.match(regExp)];
console.log(matches)
matches.forEach(item => {
    console.log(item.slice(1 , -1))
})

