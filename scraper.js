const rp = require("request-promise");
const $ = require("cheerio");
const url = `https://www.ncbi.nlm.nih.gov/geo/browse/?view=samples&series=15745&sort=type&display=500&page=1`;
const filter = "genomic";
const serie = [];

rp(url)
  .then(function (html) {
    for (tr = 2; tr <= 3; tr++) {
      if ($(`tbody > tr:nth-child(${tr}) > td:not([class]):nth-child(3) > a`, html).text().substring(0, 7) === filter) {
        serie.push([
          $("tbody > tr:nth-child(2) > td:not([class]):first-child > a", html).text().split(/(\S{9})/gm).join(""),
          $("tbody > tr:nth-child(2) > td:not([class]):first-child > a", html).attr("href")]);
      }
    }
    console.log(serie)
  })
  .catch(function (error) {
    console.log(error);
  });