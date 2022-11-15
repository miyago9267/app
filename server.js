const express = require("express");
const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const areaList = require("./area.json");

const app = express();
app.use(express.static("public"));

app.get("/stat-today", (req, res)=>{
  // console.log(req.query)
  let place = areaList[req.query.area]
  // console.log(place)
  axios.get('https://www.cdc.gov.tw/RSS/RssXml/Hh094B49-DRwe2RR4eFfrQ?type=1')
    .then( (data)=>{
      const parser = new XMLParser();
      let jObj = parser.parse(data.data);

      let re = /新增([0-9,]+)例COVID-19確定病例，分別為([0-9,]+)例本土個案及([0-9,]+)例境外移入/;
      let reg = place + '\\(([0-9,]+)例\\)'
      let reT = new RegExp(reg)
      const item = jObj.rss.channel.item;
      let raw, found, foundArea;
      for(let i=0;i<item.length;i++){
        found = item[i].title.match(re);
        if(found) {
          raw = item[i];
          break;
        }
      }
      foundArea = raw.description.match(reT);
      const result = {
        total: found[1],
        local: found[2],
        remote: found[3],
        area: foundArea ? foundArea[1] : 0,
        date: raw.guid.slice(5,10),
        link: raw.link
      }
      //res.set('Content-Type', 'application/json');
      res.json(result);
    })
    .catch((err)=>{console.log(err);} )
});

app.get("/get-area", (req, res)=>{
  res.json(areaList)
});

app.listen(3030, ()=>{
  console.log("server starting on port: " + 3030);
});
