async function part1() {
    const input = await Deno.readTextFile("day2.txt");
    let lines = input.split("\n");

    let rgbCount = {
        "red": 0,
        "blue": 0,
        "green": 0
    }

    const successCondition = {
        "red": 12,
        "blue": 14,
        "green": 13
    }

    let invalidGames = [];
    let ids = [];
    let sum = 0;

    lines.forEach(line => {
        if(line) {
            let id = line.split(':')[0].split(' ')[1];
            ids.push(id)
        
            let shown = line.split(':')[1].split(';');
            set: for(let setShown in shown) {
                let colors = shown[setShown].split(",");
                Object.keys(rgbCount).forEach((rgb) => {
                   let colorFound = colors.find((color) => color.indexOf(rgb) > -1);
                    if(colorFound) {
                        rgbCount[rgb] = parseInt(colorFound.split(" ")[1])
                    } else {
                        rgbCount[rgb] = 0;
                    }
                })
                for(let color in Object.keys(rgbCount)) {
                    if(rgbCount[Object.keys(rgbCount)[color]] > successCondition[Object.keys(rgbCount)[color]]) {
                        if(!invalidGames.includes(id)) invalidGames.push(id);
                        break set;
                    }
                }
            }
        }
    });
    ids.forEach((id) => {
        if(!invalidGames.includes(id)) sum+=parseInt(id);
    })
    console.log(sum)
}

async function part2() {
    const input = await Deno.readTextFile("day2.txt");
    let lines = input.split("\n");
    let rgbCount = {
        "red": 0,
        "blue": 0,
        "green": 0
    }

    let sum = 0;

    lines.forEach((line) => {
        if(line) {
            let shown = line.split(':')[1].split(';');
            for(let setShown in shown) {
                let colors = shown[setShown].split(",");
                Object.keys(rgbCount).forEach((rgb) => {
                    let colorFound = colors.find((color) => color.indexOf(rgb) > -1);
                    if(colorFound) {
                        if(rgbCount[rgb] < parseInt(colorFound.split(" ")[1])) {
                            rgbCount[rgb] = parseInt(colorFound.split(" ")[1])
                        }
                    }
                })
            }
            let lineProduct = rgbCount.red * rgbCount.blue * rgbCount.green;
            sum += lineProduct;
            rgbCount = {
                "red": 0,
                "blue": 0,
                "green": 0
            }
        }
    })
    console.log(sum)
}
part1();
part2();