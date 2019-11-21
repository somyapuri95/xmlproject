/* eslint-disable no-undef */
'use strict';

const axios = require('axios');
const parser = require('fast-xml-parser');
const j2x = require('fast-xml-parser').j2xParser;
const updationScheme = require('../helpers/updateEntities');

let XML_URL =
  'https://www.sauerlandmakelaar.nl/xml.php?qs=huisenaanbod';

exports.kyeroFormat = async (req, res) => {

    try {
    // Get Data from the url using axios
        let xmlRes = await axios.get(XML_URL);
        let xmlData = xmlRes.data;
        // Convert Data to JSON
        if (parser.validate(xmlData) === true) {
            let xmlJson = parser.parse(xmlData);
            // let property = xmlJson.root.property;

            return res.data(xmlJson);
        }
    } catch (error) {
        console.log(error);
    }
};

exports.xmlFormat = async (req, res) => {

    try {
    // Get Data from the url using axios
        let xmlRes = await axios.get(XML_URL);
        let xmlData = xmlRes.data;
        // Convert Data to JSON
        if (parser.validate(xmlData) === true) {
            let xmlJson = parser.parse(xmlData);
            var parsera = new j2x();
            var xml = parsera.parse(xmlJson);
            return res.data(xml);
        }
    } catch (error) {
        console.log(error);
    }
};

exports.createKyreoFormat = async (req, res) => {
    let model = req.body;
    try {
    // Get Data from the url using axios
        let xmlRes = await axios.get(model.url);
        let xmlData = xmlRes.data;
        // Convert Data to JSON
        if (parser.validate(xmlData) === true) {
            let xmlJson = parser.parse(xmlData);
            // let property = xmlJson.root.property;

            model.url = JSON.stringify(xmlJson);
            let post = await new db.xml(model).save();
            return res.data(post);

        }
    } catch (error) {
        console.log(error);
    }
};



exports.getKyreoFormat = async (req, res) => {
    try {
        let xmltojson = await db.xml.findById(req.params.id);
        return res.data(xmltojson);

    } catch (e) {
        return res.failure(e);
    }

};


exports.updateKyreoFormat = async (req, res) => {
    let model = req.body;
    try {
        let xmltojson = await db.xml.findById(req.params.id);
        let url = xmltojson.url;
        let xml = JSON.parse(url);
        let product = [];
        for (var y = 0; y < xml.root.property.length; y++) {
            let prijs = xml.root.property[y];
            product = prijs;
                
        }
        product = updationScheme.update(model, product);
        // product = await product.save();
        return res.data(product);
    } catch (e) {
        return res.failure(e);
    }

};


exports.updateKyreoColumn = async (req, res) => {
    let model = req.body;
    try {
        let xmltojson = await db.xml.findById(req.params.id);
        let url = xmltojson.url;
        let xml = JSON.parse(url);
        let product = [];
        for (var y = 0; y < xml.root.property.length; y++) {
            let prijs = Object.keys(xml.root.property[y]);
            product = prijs;
              
        }
        product = updationScheme.update(model, product);
        console.log(product);
        // product = await product.save();
        return res.data(product);
    } catch (e) {
        return res.failure(e);
    }

};

exports.allkyeroformEntries = async(req, res) => {

    try {
        let xmltojson = await db.xml.find();
        for (var i = 0; i < xmltojson.length; i++) {
            let url = xmltojson[i].url;
            let xml = JSON.parse(url);
            let product = [];
            for (var y = 0; y < xml.root.property.length; y++) {
                let prijs = Object.keys(xml.root.property[y]);
                product = prijs;
                
            }
            return res.page(product);
        }
       
      

    } catch (e) {
        return res.failure(e);
    }

};