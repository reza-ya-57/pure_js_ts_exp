var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
console.log('test@!&&hala&&Q23(34'.split('&&'));
var myRe = new RegExp('(.*?)', 'g');
var myarr = myRe.exec('test(reza)');
console.log(myarr);
var txt = "(Q23(34 || 12)) & (Q12(45 && 11))";
var newtxt = txt.split('&');
console.log(newtxt);
var regExp = /\(([^)]+)\)/g;
var matches = __spreadArray([], txt.match(regExp), true);
console.log(matches);
matches.forEach(function (item) {
    console.log(item.slice(1, -1));
});
