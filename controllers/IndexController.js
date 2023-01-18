const TokenManager = require("../midleware/tokenManager");
const { MongoClient } = require("mongodb");
const ResponseManager = require("../midleware/ResponseManager");
const uri = "mongodb+srv://admin:as55q5w5@cluster0.sbbklsu.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const userCollection = client.db("gameProj").collection("user");
class IndexController {
    static async index(req,res){
        const DBuser = await userCollection.findOne({"name": 'ayu'});
        console.log(DBuser)
        res.send(DBuser.name);
    }
    static home(req,res){
        res.send('From home in index');
    }
}
module.exports = IndexController;