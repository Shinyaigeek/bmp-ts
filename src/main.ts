import bmp from "bmp-js"
import fs from "fs"
import path from "path"

const targetBmp = fs.readFileSync(path.join(__dirname, "../in.bmp"))
const bmpData = bmp.decode(targetBmp);

let { width, height } = bmpData

width *= 4;

let temp: number;

// console.log(bmpData.width, bmpData.p)

const newData = bmpData.data.map((bite, idx, arr) => {
    // console.log(bite)
    // if (bite < 225) {
    //     return bite + 30
    // } else {
    //     return 255
    // }

    // return 255 - bite

    // if (idx % 4 === 1) {
    //     temp = (bite + arr[idx + 1] + arr[idx + 2]) / 3;
    // }

    // if (idx % 4 === 0) {
    //     return bite
    // }
    // return temp

    const y = (idx - idx % width) / width;
    const x = idx % width

    const group_x = ((x - x % 4) / 4)

    // return arr[width * (y - y % 2) / 2 + ((group_x - group_x % 2) / 2 + width / 8) * 4 + x % 4]

    if (group_x < bmpData.width / 2) {

        return arr[(bmpData.width - group_x) * 4 + x % 4 + width * y]

    } else {
        return arr[group_x * 4 + x % 4 + width * y]

    }


})

const output = bmp.encode(Object.assign({}, bmpData, {
    data: Buffer.from(newData)
}))

fs.writeFileSync(path.join(__dirname, "../output.bmp"), output.data)