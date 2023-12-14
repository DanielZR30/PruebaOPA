const dbContext = './src/database/climbs.json'
const fs = require('fs')

const getAllClimbs =  () =>{
    try {
        let d = fs.readFileSync(dbContext)
        return JSON.parse(d)
    } catch (error) {
        return {isError:true,message:error, aqui:"Si"}
    }
}

const createClimb = async (climb) => {
    try {
        let data = getAllClimbs(dbContext).climbs
        console.log(JSON.stringify(data) +" create climb")
        data.push(climb)
        fs.writeFileSync(dbContext,JSON.stringify({climbs:data}),'utf8')
    } catch (error) {
        return {isError:true, message:error.message}
    }
}

module.exports = {getAllClimbs,createClimb}