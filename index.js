// const Pbf = require('pbf')
// const fs = require('fs')
// const path = require('path')

// var pbf = new Pbf(fs.readFileSync(path.join(__dirname, 'cities.pbf')))
// var cities = []

// var lastLat = 0
// var lastLon = 0

// while (pbf.pos < pbf.length) {
//     cities.push(pbf.readMessage(readCity, {
//         name: '',
//         country: ''
//     }))
// }

// let hash = JSON.stringify(cities);
// fs.writeFile("./cities.txt", hash, function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 
// // var blob = blobUtil.createBlob([hash], {type: "text/plain;charset=utf-8"});
// // FileSaver.saveAs(blob, "cities.txt");

// module.exports = cities

// function readCity(tag, city, pbf) {
//     if (tag === 1) city.name = pbf.readString()
//     else if (tag === 2) city.country = pbf.readString()
//     else if (tag === 3) city.altCountry = pbf.readString()
// }

const cities = require('./cities.json');
const regions = require('./region-country-map.json');
let regionCountryMap = Object.assign({}, regions);

const fs = require('fs')
for(region in regionCountryMap) {
    for(i in regionCountryMap[region]) {
        for(j in cities) {
            if(cities[j]['country'] === regionCountryMap[region][i]['code']) {
                if(regionCountryMap[region][i]['cities'] === undefined) 
                    regionCountryMap[region][i]['cities'] = [];
                regionCountryMap[region][i]['cities'].push(cities[j]);
            }
        }
    }
}

let hash = JSON.stringify(regionCountryMap);
fs.writeFile("./final-cities.txt", hash, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 