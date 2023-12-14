const bodyParser = require("../lib/bodyParser");
const { findOptimalItems } = require("../services/services");
const climbs = require('../database/climb')

const climbControl = async (req,res) => {
    const { url, method } = req;
    console.log(`URL: ${url} - Method: ${method}`);
  
    switch (method) {
      case "GET":
        await getClimbs(req,res)
        break;
      case "POST":
        await createClimb(req,res)
        break;
      case "PUT":
        break;
      case "PATCH":
        break;
      case "DELETE":
        break;
      default:
        res.end()
        break;
    }
}

const getClimbs = async (req,res) =>{
    let data = climbs.getAllClimbs()
    console.log(data)
    res.writeHead(200,{'Content-type': 'application/json','Access-Control-Allow-Origin': '*'});
    res.body = JSON.stringify(data)
    res.write(JSON.stringify(data))
    res.end()
}

const createClimb = async (req,res) =>{
    try {
        await bodyParser(req)
        console.log(req.body)
        let result = {
            elements: req.body.elements,
            requirements:req.body.requirements,
            solution:findOptimalItems(req.body.elements,req.body.requirements)
        }
        climbs.createClimb(result)
        res.writeHead(200,{'Content-type': 'application/json','Access-Control-Allow-Origin': '*'});
        res.write(JSON.stringify(result))
        res.end()
    } catch (error) {
        
    }
}

module.exports = {climbControl}