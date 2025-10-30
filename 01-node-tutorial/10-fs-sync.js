const { readFileSync, writeFileSync } = require('fs')

const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')
// console.log(first, second)

writeFileSync('./content/result-sync.txt',
    `Here is the result : ${first} , ${second}`,
    //if I need to add text not replace it
    // { flag: 'a' }
)
const result_sync = readFileSync('./content/result-sync.txt','utf8')
console.log(result_sync)


