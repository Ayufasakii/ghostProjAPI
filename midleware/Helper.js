const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://Kanyakon:1234Passw0rd@lotte1.jodcbbb.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const configCollection = client.db("appdb").collection("LotteConfig");
class Helper{
    static async mapConfig(topic,subtopic,value){
        const DBconfig = await configCollection.findOne({"Topic": topic,"Sub_topic":subtopic,"value":value});
        return DBconfig.text
    }
}

module.exports = Helper;