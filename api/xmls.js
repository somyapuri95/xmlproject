/* eslint-disable no-undef */
'use strict';

const axios = require('axios');
const parser = require('fast-xml-parser');
// const j2x = require('fast-xml-parser').j2xParser;
const updationScheme = require('../helpers/updateEntities');


exports.store = async (req, res) => {
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

exports.readOne = async (req, res) => {
    try {
        let xmltojson = await db.xml.findById(req.params.id);
        return res.data(xmltojson);

    } catch (e) {
        return res.failure(e);
    }

};


exports.updateValue = async (req, res) => {
    // let model = req.body;
    try {
        let xmltojson = await db.xml.findById(req.params.id);
        let url = xmltojson.url;
        let xml = JSON.parse(url);
        let properties = xml.root.property;
        let upadtedProps = properties.map(property => {
            // if(property.id == req.body.id){
            property.title = req.body.title;
            // }
            return property;
        });
        xml.root.property = upadtedProps;
        xmltojson.url = JSON.stringify(xml);
        xmltojson = await xmltojson.save();
        return res.data(upadtedProps);

        /*
         * /*
         * for (var y = 0; y < xml.root.property.length; y++) {
         *     let id = xml.root.property[y].id;
         *     let title = xml.root.property[y].title;
         *     product[y] = {id,title};
         * }
         * let found = product.find(obj => obj.id == req.body.id);
         * found = updationScheme.update(model, found);
         * found = await db.xml.save();
         */
        // return res.data('found');
        
    } catch (e) {
        return res.failure(e);
    }

};


exports.updateColumn = async (req, res) => {
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

exports.read = async(req, res) => {

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

exports.allreadValue = async (req, res) => {
    try {
        let xmltojson = await db.xml.find();
        for (var i = 0; i < xmltojson.length; i++) {
            let url = xmltojson[i].url;
            let xml = JSON.parse(url);
            let product = [];
            for (var y = 0; y < xml.root.property.length; y++) {
                product[y] = xml.root.property[y];
                
                
            }
            return res.page(product);
        }
       
        
    } catch (e) {
        return res.failure(e);
    }

};