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
