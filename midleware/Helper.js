const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://admin:<password>@cluster0.sbbklsu.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const configCollection = client.db("gameProj").collection("user");
class Helper{
    static async mapConfig(topic,subtopic,value){
        const DBconfig = await configCollection.findOne({"Topic": topic,"Sub_topic":subtopic,"value":value});
        return DBconfig.text
    }
}

module.exports = Helper;