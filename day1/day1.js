const numbersMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
}
const text = await Deno.readTextFile("day1.txt");
let sum = 0;
let lines = text.split("\n");
lines.forEach(line => {
    let lineBefore = line;
    let foundIndices = [];
    Object.keys(numbersMap).forEach((n) => {
        let lastIndex = -1;
        while(line.toLowerCase().indexOf(n, lastIndex) > -1) {

            foundIndices.push({index:line.toLowerCase().indexOf(n, lastIndex), value: n})
            lastIndex = line.indexOf(n, lastIndex)+1;
        }
    });
    foundIndices.sort((a,b) => a.index-b.index)
    let maxElement = foundIndices[foundIndices.length-1];
    let minElement = foundIndices[0]
    if(minElement)  line = line.replace(minElement.value, numbersMap[minElement.value])
    let lengthOfMinValue = minElement?.value?.length;

    // console.log('[line-2]', line)
    if(maxElement && maxElement.index !== minElement.index) {
        if(line.indexOf(maxElement.value) === -1) { // first replcace messed up second replcae string
            line = line.slice(0, maxElement.index+2-lengthOfMinValue) + numbersMap[maxElement.value] + line.slice(maxElement.index+2-lengthOfMinValue)
        } else {
            line = line.replaceAll(maxElement.value, numbersMap[maxElement.value])
        }
    }
    let first, last;
    for(let i = 0; i < line.length; i++) {
        if(line[i] >= '0' && line[i] <='9') {
            if(!first) first = line[i];
            else last = line[i];
        }
    }
    if(first && !last) last = first;
    if(first && last) {
        // console.log(lineBefore, line, first, last)
        // console.log(lineBefore, first, last)
        let value = parseInt(first+last)
        sum += value;
    }
});
console.log(sum)