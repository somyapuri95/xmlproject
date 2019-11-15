var express = require('express');
var router = express.Router();
const axios = require("axios");
let User = require('../models/user.js');
const parser = require("fast-xml-parser");
var convert = require('xml-js');
const j2x = require("fast-xml-parser").j2xParser;
/* GET home page. */
let XML_URL =
  "https://www.purespain.com/zoekuwtweedehuis.xml";

router.get("/", async (req, res) => {
  try {
    //Get Data from the url using axios
    let xmlRes = await axios.get(XML_URL);
    let xmlData = xmlRes.data;
    //Convert Data to JSON
    if (parser.validate(xmlData) === true) {
      let xmlJson = parser.parse(xmlData);
      let property = xmlJson.root.property;
      //let singleProp = property[0];
      //Add Country Property to json array
      let jsonArray = property.map(singleProp => {
        var xmlObj = {};
        for (const element in singleProp) {
          //  let singleProp = property[0];
          if (element == "id") {
            xmlObj.id = singleProp.id;
            xmlObj.country = "spain";
          }
          xmlObj[element] = singleProp[element];
        }
        return xmlObj;
      });

      xmlJson.root.property = jsonArray;
      //Convert JSON to XML
      var parsera = new j2x();
      var xml = parsera.parse(xmlJson);
      let mainList = [];
      for (var i = 0; i < xmlJson.root.property.length; i++) {
        let id = xmlJson.root.property[i].id.toString()
        let country = xmlJson.root.property[i].country

        let hu = { country }
        mainList[i] = hu;
      }
      return res.render('index', { mainList });
    }
  } catch (error) {
    console.log(error);
  }
})



//Save XML data
router.post("/add", async (req, res) => {
  try {
    // body enter data
    let model = req.body;
    let xmlRes = await axios.get(model.url);
    let xmlData = xmlRes.data;
    model.url = convert.xml2json(xmlData, { compact: true, spaces: 4 });
    const newUser = new User(model).save();
    res.redirect('/')
   // res.render('/', { newUser });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     let xmlData = await User.find();
//     let mainList = [];
//     for (var i = 0; i < xmlData.length; i++) {
//       let id = xmlData[i]._id.toString()
//       let country = xmlData[i].country

//       let hu = {id,country}
//       mainList[i] = hu;
//     }
//     return res.send(mainList);
//   } catch (error) {
//     console.log(error);
//   }
// });


// router.post("/tttt", async (req, res) => {
//   try {
//     // body enter data
//     let model = req.body
//     let xmlRes = await axios.get(model.url);
//     let xmlData = xmlRes.data;
//     if (parser.validate(xmlData) === true) {
//       let xmlJson = parser.parse(xmlData);
//       let property = xmlJson.root.property;
//       let jsonArray = property.map(singleProp => {
//         var xmlObj = {};
//         for (const element in singleProp) {
//           if (element == "id") {
//             xmlObj.id = singleProp.id;
//             xmlObj.country = "spain";
//           }
//           xmlObj[element] = singleProp[element];
//         }
//         return xmlObj;
//       });

//       xmlJson.root.property = jsonArray;
//       //Convert JSON to XML
//       var parsera = new j2x();
//       var xml = parsera.parse(xmlJson);
//       let mainList = [];
//       for (var i = 0; i < xmlJson.root.property.length; i++) {
//         let id = xmlJson.root.property[i].id.toString()
//         let country = xmlJson.root.property[i].country

//         let hu = { country }
//         mainList[i] = hu;
//       }
//       //  model.urlXML = mainList
//       const newUser = new User(mainList).save();
//       return res.send('Url Added');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

router.put("/update", async (req, res) => {
  try {
   
    let xmlRes = await axios.get(XML_URL);
    let xmlData = xmlRes.data;
    if (parser.validate(xmlData) === true) {
      let xmlJson = parser.parse(xmlData);
      let property = xmlJson.root.property;
      let jsonArray = property.map(singleProp => {
        var xmlObj = {};
        for (const element in singleProp) {
          if (element == "id") {
            xmlObj.id = singleProp.id;
            xmlObj.country = "spain";
          }
          xmlObj[element] = singleProp[element];
        }
        
        return xmlObj;
      });

      xmlJson.root.property = jsonArray;
      let mainList = [];
      for (var i = 0; i < xmlJson.root.property.length; i++) {
        let id = xmlJson.root.property[i].id.toString()
        let country = xmlJson.root.property[i].country

        let hu = { country }
        mainList[i] = hu;
      }
      return res.send(mainList);
    }
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
