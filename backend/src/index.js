const http = require("http");
const { bodyParser } = require("./lib/bodyParser");
const { climbControl } = require('./controls/climbControl')



const server = http.createServer(async (req, res) => {
    const { url, method } = req;
  if(url.includes("elements")){
    console.log("Hola")
    await climbControl(req,res)
  }else{
    res.writeHead(404,{'Content-type': 'application/json'});
    res.write(JSON.stringify({isError:true,message:"No se encuentra"}))
    res.end()
  }
});

server.listen(8000);
console.log("Server on port", 8000);


